from fastapi import APIRouter

router = APIRouter(tags=["AI Agent"])

@router.post("/generate-response")
def generate_response(data: dict):

    message = data.get("message", "").lower()

    if "pain" in message:
        response = "Please contact emergency services immediately."

    elif "fever" in message:
        response = "Monitor temperature and stay hydrated."

    else:
        response = "Your condition appears stable."

    return {
        "patient_message": message,
        "ai_response": response
    }
@router.post("/trigger-event")
def trigger_event(data: dict):

    event = data.get("event")

    return {
        "status": "triggered",
        "event": event
    }
from fastapi import APIRouter
from services.decision_engine import detect_risk

router = APIRouter(tags=["AI Agent"])

# ==========================
# AI RESPONSE
# ==========================
@router.post("/generate-response")
def generate_response(data: dict):

    message = data.get("message", "").lower()

    heart_rate = data.get("heart_rate", 80)
    oxygen = data.get("oxygen", 98)

    # AI RISK DETECTION
    risk = detect_risk(heart_rate, oxygen)

    # RESPONSE LOGIC
    if risk == "Critical":
        response = "Critical condition detected. Immediate medical attention required."

    elif risk == "Moderate":
        response = "Patient requires monitoring."

    else:
        response = "Patient condition stable."

    return {
        "patient_message": message,
        "heart_rate": heart_rate,
        "oxygen": oxygen,
        "risk": risk,
        "ai_response": response
    }