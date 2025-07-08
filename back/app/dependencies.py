from sqlmodel import Session as DBSession
import redis.asyncio as aioredis
from app.config import get_settings
from app.models import Session
from app.database import engine

settings = get_settings()

def get_db():
    with DBSession(engine) as session:
        yield session

async def get_redis():
    redis = aioredis.from_url(settings.redis_url, decode_responses=True)
    try:
        yield redis
    finally:
        await redis.close()
