from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from fastapi.websockets import WebSocket, WebSocketState, WebSocketDisconnect

from sqlmodel import select

from app import logger
from app.dependencies import get_redis
from app.database import get_session, remove_session

router = APIRouter()
clients = {}


@router.get("/")
async def root():
    return {"message": "OK"}


@router.post("/session")
async def create_session():
    session = get_session()
    return {"session_id": session.id}


@router.websocket("/ws/{session_id}")
async def websocket_endpoint(
    websocket: WebSocket, session_id: str, redis=Depends(get_redis)
):
    await websocket.accept()
    if session_id not in clients:
        clients[session_id] = set()
    clients[session_id].add(websocket)
    logger.info(f"Client connected to session {session_id}")

    try:
        text = await redis.get(f"session:{session_id}:text")
        if text:
            await websocket.send_text(text)

        while True:
            try:
                data = await websocket.receive_text()
            except WebSocketDisconnect:
                break

            await redis.set(f"session:{session_id}:text", data)
            logger.info(f"Received data: {data}")

            # send to all clients in this session
            for client in clients[session_id]:
                if client != websocket:
                    await client.send_text(data)
            logger.info(f"Sent data to all clients in session {session_id}")

    except WebSocketDisconnect:
        clients[session_id].remove(websocket)
        if not clients[session_id]:
            del clients[session_id]
        remove_session(session_id)
            
