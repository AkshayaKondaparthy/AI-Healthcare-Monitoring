from sqlalchemy import create_engine

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import sessionmaker

from config import DATABASE_URL

# =========================================================
# DATABASE ENGINE
# =========================================================

engine = create_engine(

    DATABASE_URL,

    pool_pre_ping=True,

    pool_size=10,

    max_overflow=20,

    echo=False
)

# =========================================================
# SESSION
# =========================================================

SessionLocal = sessionmaker(

    autocommit=False,

    autoflush=False,

    bind=engine
)

# =========================================================
# BASE MODEL
# =========================================================

Base = declarative_base()

# =========================================================
# DATABASE DEPENDENCY
# =========================================================

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()