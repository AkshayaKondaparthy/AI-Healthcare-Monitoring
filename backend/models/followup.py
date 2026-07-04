from sqlalchemy import Column, Integer, String
from database import Base

class FollowUp(Base):

    __tablename__ = "followups"

    id = Column(Integer, primary_key=True, index=True)

    patient = Column(String, nullable=False)

    time = Column(String, nullable=False)

    status = Column(String, nullable=False)