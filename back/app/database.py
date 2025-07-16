from sqlmodel import SQLModel, create_engine, select
from fastapi import Depends, HTTPException
from starlette.status import HTTP_500_INTERNAL_SERVER_ERROR, HTTP_404_NOT_FOUND

from app.config import get_settings
from app.models import Session
from app.dependencies import get_db
from app import logger

settings = get_settings()

try:
    engine = create_engine(settings.db_url)
    logger.info(f"Database engine created: {engine}")
except Exception as e:
    logger.error(f"Error creating database engine: {e}")
    raise e

try:
    from app import models

    SQLModel.metadata.create_all(engine)
    logger.info("Database tables created")
except Exception as e:
    logger.error(f"Error creating database tables: {e}")
    raise e


def get_session(db=Depends(get_db)) -> Session:
    session = Session()
    try:
        db.add(session)
        db.commit()
        db.refresh(session)
    except Exception as e:
        logger.error(f"Error while create session: {e}")
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error while create session: {e}",
        )
    return session


def remove_session(session_id: str, db=Depends(get_db)):
    try:
        statement = select(Session).where(Session.id == session_id)
        session = db.exec(statement).first()
        if not session:
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND, detail=f"Session {session_id} not found"
            )
        db.remove(session)
        db.commit()
        logger.info(f"Session {session_id} removed")
    except Exception as e:
        logger.error(f"Error while remove session: {e}")
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error while remove session: {e}",
        )
