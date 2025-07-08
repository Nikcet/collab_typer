from sqlmodel import SQLModel, create_engine

from app.config import get_settings
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
