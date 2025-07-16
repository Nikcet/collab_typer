from sqlmodel import Session
import redis.asyncio as aioredis
from app.config import get_settings
from app.database import engine

settings = get_settings()

def get_db():
    with Session(engine) as session:
        yield session

async def get_redis():
    redis = aioredis.from_url(settings.redis_url, decode_responses=True)
    try:
        yield redis
    finally:
        await redis.close()
