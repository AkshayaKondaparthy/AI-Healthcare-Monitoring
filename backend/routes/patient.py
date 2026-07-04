from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from database import get_db

from models.patient import Patient

from schemas import PatientCreate

from pydantic import BaseModel

router = APIRouter()

# =====================================================
# SCHEMAS
# =====================================================

class MedicationCreate(BaseModel):

    name: str

    dosage: str

    time: str


class ReportCreate(BaseModel):

    title: str

    date: str

    status: str


class NoteCreate(BaseModel):

    doctor: str

    note: str


class AppointmentCreate(BaseModel):

    doctor: str

    date: str

    time: str

# =====================================================
# TEMP STORAGE
# =====================================================

patient_reports = []

patient_medications = []

patient_notes = []

patient_appointments = []

# =====================================================
# ADD PATIENT
# =====================================================

@router.post("/patients")

def add_patient(
    data: PatientCreate,
    db: Session = Depends(get_db)
):

    try:

        patient = Patient(

            id=data.id,

            name=data.name,

            diagnosis=data.diagnosis,

            phone=data.phone,

            score=data.score,

            status=data.status
        )

        db.add(patient)

        db.commit()

        db.refresh(patient)

        return {

            "success": True,

            "message":
            "Patient added successfully",

            "data": patient
        }

    except Exception as e:

        return {

            "success": False,

            "error": str(e)
        }

# =====================================================
# GET ALL PATIENTS
# =====================================================

@router.get("/patients")

def get_patients(
    db: Session = Depends(get_db)
):

    try:

        patients = db.query(Patient).all()

        return patients

    except Exception as e:

        return {

            "success": False,

            "error": str(e)
        }

# =====================================================
# GET SINGLE PATIENT
# =====================================================

@router.get("/patients/{patient_id}")

def get_patient(
    patient_id: str,
    db: Session = Depends(get_db)
):

    patient = db.query(Patient).filter(
        Patient.id == patient_id
    ).first()

    if not patient:

        return {

            "success": False,

            "message":
            "Patient not found"
        }

    return patient

# =====================================================
# UPDATE PATIENT
# =====================================================

@router.put("/patients/{patient_id}")

def update_patient(
    patient_id: str,
    data: PatientCreate,
    db: Session = Depends(get_db)
):

    patient = db.query(Patient).filter(
        Patient.id == patient_id
    ).first()

    if not patient:

        return {

            "success": False,

            "message":
            "Patient not found"
        }

    patient.name = data.name
    patient.diagnosis = data.diagnosis
    patient.phone = data.phone
    patient.score = data.score
    patient.status = data.status

    db.commit()

    db.refresh(patient)

    return {

        "success": True,

        "message":
        "Patient updated successfully",

        "data": patient
    }

# =====================================================
# DELETE PATIENT
# =====================================================

@router.delete("/patients/{patient_id}")

def delete_patient(
    patient_id: str,
    db: Session = Depends(get_db)
):

    patient = db.query(Patient).filter(
        Patient.id == patient_id
    ).first()

    if not patient:

        return {

            "success": False,

            "message":
            "Patient not found"
        }

    db.delete(patient)

    db.commit()

    return {

        "success": True,

        "message":
        "Patient deleted successfully"
    }

# =====================================================
# REPORTS
# =====================================================

@router.get("/patients/{patient_id}/reports")

def get_reports(patient_id: str):

    reports = [

        r for r in patient_reports

        if r["patient_id"] == patient_id
    ]

    return reports

@router.post("/patients/{patient_id}/reports")

def add_report(
    patient_id: str,
    data: ReportCreate
):

    report = {

        "patient_id": patient_id,

        "title": data.title,

        "date": data.date,

        "status": data.status
    }

    patient_reports.append(report)

    return {

        "success": True,

        "message":
        "Report added successfully",

        "data": report
    }

@router.delete("/patients/{patient_id}/reports")

def delete_reports(patient_id: str):

    global patient_reports

    patient_reports = [

        r for r in patient_reports

        if r["patient_id"] != patient_id
    ]

    return {

        "success": True,

        "message":
        "Reports deleted successfully"
    }

# =====================================================
# MEDICATIONS
# =====================================================

@router.get("/patients/{patient_id}/medications")

def get_medications(patient_id: str):

    medications = [

        m for m in patient_medications

        if m["patient_id"] == patient_id
    ]

    return medications

@router.post("/patients/{patient_id}/medications")

def add_medication(
    patient_id: str,
    data: MedicationCreate
):

    medication = {

        "patient_id": patient_id,

        "name": data.name,

        "dosage": data.dosage,

        "time": data.time
    }

    patient_medications.append(medication)

    return {

        "success": True,

        "message":
        "Medication added successfully",

        "data": medication
    }

@router.delete("/patients/{patient_id}/medications")

def delete_medications(patient_id: str):

    global patient_medications

    patient_medications = [

        m for m in patient_medications

        if m["patient_id"] != patient_id
    ]

    return {

        "success": True,

        "message":
        "Medications deleted successfully"
    }

# =====================================================
# NOTES
# =====================================================

@router.get("/patients/{patient_id}/notes")

def get_notes(patient_id: str):

    notes = [

        n for n in patient_notes

        if n["patient_id"] == patient_id
    ]

    return notes

@router.post("/patients/{patient_id}/notes")

def add_note(
    patient_id: str,
    data: NoteCreate
):

    note = {

        "patient_id": patient_id,

        "doctor": data.doctor,

        "note": data.note
    }

    patient_notes.append(note)

    return {

        "success": True,

        "message":
        "Note added successfully",

        "data": note
    }

# =====================================================
# APPOINTMENTS
# =====================================================

@router.get("/patients/{patient_id}/appointments")

def get_appointments(patient_id: str):

    appointments = [

        a for a in patient_appointments

        if a["patient_id"] == patient_id
    ]

    return appointments

@router.post("/patients/{patient_id}/appointments")

def add_appointment(
    patient_id: str,
    data: AppointmentCreate
):

    appointment = {

        "patient_id": patient_id,

        "doctor": data.doctor,

        "date": data.date,

        "time": data.time
    }

    patient_appointments.append(appointment)

    return {

        "success": True,

        "message":
        "Appointment added successfully",

        "data": appointment
    }

@router.delete("/patients/{patient_id}/appointments")

def delete_appointments(patient_id: str):

    global patient_appointments

    patient_appointments = [

        a for a in patient_appointments

        if a["patient_id"] != patient_id
    ]

    return {

        "success": True,

        "message":
        "Appointments deleted successfully"
    }