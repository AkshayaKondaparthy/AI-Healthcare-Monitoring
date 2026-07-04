from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from datetime import datetime

router = APIRouter(tags=["Logs & Followups"])


# =========================
# SERIALIZERS
# =========================
def serialize_log(log):
    return {
        "id": log.id,
        "patient": log.patient,
        "action": log.action,
        "status": log.status,
        "risk": log.risk,
        "time": log.time
    }


def serialize_followup(f):
    return {
        "id": f.id,
        "patient": f.patient,
        "time": f.time,
        "status": f.status
    }


# =========================
# LOGS APIs
# =========================

# GET LOGS
@router.get("/logs")
def get_logs(db: Session = Depends(get_db)):

    logs = db.query(models.Log)\
        .order_by(models.Log.id.desc())\
        .all()

    return {
        "count": len(logs),
        "logs": [serialize_log(l) for l in logs]
    }


# CREATE LOG
@router.post("/logs")
def create_log(data: schemas.LogCreate, db: Session = Depends(get_db)):

    log = models.Log(
        patient=data.patient,
        action=data.action,
        status=data.status,
        risk=data.risk,
        time=data.time or datetime.utcnow().isoformat()
    )

    db.add(log)
    db.commit()
    db.refresh(log)

    return serialize_log(log)


# DELETE LOG ✅ NEW
@router.delete("/logs/{id}")
def delete_log(
    id: int = Path(...),
    db: Session = Depends(get_db)
):

    log = db.query(models.Log)\
        .filter(models.Log.id == id)\
        .first()

    if not log:
        raise HTTPException(
            status_code=404,
            detail=f"Log with id {id} not found"
        )

    db.delete(log)
    db.commit()

    return {
        "success": True,
        "message": "Log deleted successfully",
        "deleted_id": id
    }


# =========================
# FOLLOWUPS APIs
# =========================

# GET FOLLOWUPS
@router.get("/followups")
def get_followups(db: Session = Depends(get_db)):

    followups = db.query(models.FollowUp)\
        .order_by(models.FollowUp.id.desc())\
        .all()

    return {
        "count": len(followups),
        "followups": [serialize_followup(f) for f in followups]
    }


# SCHEDULE FOLLOWUP
@router.post("/schedule-followup")
def schedule_followup(
    data: schemas.FollowUpCreate,
    db: Session = Depends(get_db)
):

    followup = models.FollowUp(
        patient=data.patient,
        time=data.time,
        status="scheduled"
    )

    db.add(followup)
    db.commit()
    db.refresh(followup)

    # AUTO LOG
    log = models.Log(
        patient=data.patient,
        action="Follow-up Scheduled",
        status="Scheduled",
        risk="Moderate",
        time=datetime.utcnow().isoformat()
    )

    db.add(log)
    db.commit()

    return {
        "message": "Follow-up scheduled successfully",
        "followup": serialize_followup(followup)
    }


# COMPLETE FOLLOWUP
@router.post("/complete-followup/{id}")
def complete_followup(
    id: int = Path(...),
    db: Session = Depends(get_db)
):

    followup = db.query(models.FollowUp)\
        .filter(models.FollowUp.id == id)\
        .first()

    if not followup:
        raise HTTPException(
            status_code=404,
            detail=f"Follow-up with id {id} not found"
        )

    followup.status = "completed"
    db.commit()

    # AUTO LOG
    log = models.Log(
        patient=followup.patient,
        action="Follow-up Completed",
        status="Completed",
        risk="Stable",
        time=datetime.utcnow().isoformat()
    )

    db.add(log)
    db.commit()

    return {
        "success": True,
        "message": "Follow-up completed successfully"
    }


# DELETE FOLLOWUP
@router.delete("/followups/{id}")
def delete_followup(
    id: int = Path(...),
    db: Session = Depends(get_db)
):

    followup = db.query(models.FollowUp)\
        .filter(models.FollowUp.id == id)\
        .first()

    if not followup:
        raise HTTPException(
            status_code=404,
            detail=f"Follow-up with id {id} not found"
        )

    db.delete(followup)
    db.commit()

    return {
        "success": True,
        "message": "Follow-up deleted successfully",
        "deleted_id": id
    }