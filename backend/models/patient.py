from sqlalchemy import Column, Integer, String
from database import Base

class Patient(Base):

    __tablename__ = "patients"

    id = Column(
        String,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    diagnosis = Column(
        String,
        nullable=False
    )

    phone = Column(
        String,
        nullable=False
    )

    score = Column(
        Integer,
        nullable=False,
        default=70
    )

    status = Column(
        String,
        nullable=False,
        default="Stable"
    )