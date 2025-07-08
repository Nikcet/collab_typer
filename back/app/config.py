import os
from dotenv import load_dotenv
from functools import lru_cache

from pydantic_settings import BaseSettings

from app import logger

load_dotenv()


class Settings(BaseSettings):
    db_url: str = os.environ["DB_URL"]
    redis_url: str = os.environ["REDIS_URL"]

@lru_cache
def get_settings() -> Settings:
    logger.info("Loading settings...")
    return Settings()


__all__ = ["get_settings"]
