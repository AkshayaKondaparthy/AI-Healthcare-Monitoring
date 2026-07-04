from fastapi import APIRouter
from pydantic import BaseModel

from services.groq_service import ask_ai

router = APIRouter()

class AIRequest(BaseModel):
    message: str


@router.post("/ask-ai")
def ask_ai_route(data: AIRequest):

    reply = ask_ai(data.message)

    return {
        "reply": reply
    }