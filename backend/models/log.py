# models/log.py

from sqlalchemy import Column, Integer, String
from database import Base

class Log(Base):

    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)

    patient = Column(String, nullable=False)

    action = Column(String, nullable=False)

    status = Column(String, nullable=False)

    risk = Column(String, nullable=False)

    time = Column(String, nullable=False)