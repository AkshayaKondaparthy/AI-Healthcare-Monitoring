from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from database import get_db

from models import User

from auth import create_token

from pydantic import BaseModel

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# =====================================================
# SCHEMAS
# =====================================================

class SignupRequest(BaseModel):

    username: str

    password: str


class LoginRequest(BaseModel):

    username: str

    password: str

# =====================================================
# DOCTOR SIGNUP
# =====================================================

@router.post("/doctor/signup")

def doctor_signup(
    data: SignupRequest,
    db: Session = Depends(get_db)
):

    existing = db.query(User).filter(
        User.username == data.username,
        User.role == "doctor"
    ).first()

    if existing:

        raise HTTPException(
            status_code=400,
            detail="Doctor already exists"
        )

    doctor = User(

        username=data.username,

        password=data.password,

        role="doctor"
    )

    db.add(doctor)

    db.commit()

    db.refresh(doctor)

    return {

        "success": True,

        "message":
        "Doctor registered successfully"
    }

# =====================================================
# PATIENT SIGNUP
# =====================================================

@router.post("/patient/signup")

def patient_signup(
    data: SignupRequest,
    db: Session = Depends(get_db)
):

    existing = db.query(User).filter(
        User.username == data.username,
        User.role == "patient"
    ).first()

    if existing:

        raise HTTPException(
            status_code=400,
            detail="Patient already exists"
        )

    patient = User(

        username=data.username,

        password=data.password,

        role="patient"
    )

    db.add(patient)

    db.commit()

    db.refresh(patient)

    return {

        "success": True,

        "message":
        "Patient registered successfully"
    }

# =====================================================
# DOCTOR LOGIN
# =====================================================

@router.post("/doctor/login")

def doctor_login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    doctor = db.query(User).filter(

        User.username == data.username,

        User.password == data.password,

        User.role == "doctor"

    ).first()

    if not doctor:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_token({

        "user": doctor.username,

        "role": "doctor"
    })

    return {

        "success": True,

        "access_token": token,

        "role": "doctor"
    }

# =====================================================
# PATIENT LOGIN
# =====================================================

@router.post("/patient/login")

def patient_login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    patient = db.query(User).filter(

        User.username == data.username,

        User.password == data.password,

        User.role == "patient"

    ).first()

    if not patient:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_token({

        "user": patient.username,

        "role": "patient"
    })

    return {

        "success": True,

        "access_token": token,

        "role": "patient"
    }

# =====================================================
# GET DOCTORS
# =====================================================

@router.get("/doctors")

def get_doctors(
    db: Session = Depends(get_db)
):

    doctors = db.query(User).filter(
        User.role == "doctor"
    ).all()

    return doctors

# =====================================================
# GET PATIENTS
# =====================================================

@router.get("/patients")

def get_patients(
    db: Session = Depends(get_db)
):

    patients = db.query(User).filter(
        User.role == "patient"
    ).all()

    return patients

