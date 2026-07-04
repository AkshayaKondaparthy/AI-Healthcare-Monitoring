from pydantic import BaseModel

# =====================================================
# AUTH
# =====================================================

class UserSignup(BaseModel):

    name: str

    email: str

    password: str

    role: str


class UserLogin(BaseModel):

    email: str

    password: str

    role: str


# =====================================================
# PATIENT CREATE
# =====================================================

class PatientCreate(BaseModel):

    id: str

    name: str

    diagnosis: str

    phone: str

    score: int

    status: str


# =====================================================
# FOLLOW UP
# =====================================================

class FollowUpCreate(BaseModel):

    patient: str

    time: str


# =====================================================
# LOGS
# =====================================================

class LogCreate(BaseModel):

    patient: str

    action: str

    status: str

    risk: str

    time: str