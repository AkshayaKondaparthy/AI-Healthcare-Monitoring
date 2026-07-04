from fastapi import APIRouter
from fastapi import Request
from fastapi.responses import Response

from pydantic import BaseModel

from twilio.rest import Client

from twilio.twiml.voice_response import (
    VoiceResponse,
    Gather
)

from groq import Groq

from dotenv import load_dotenv

import os
import traceback

# =====================================================
# LOAD ENV
# =====================================================

load_dotenv()

# =====================================================
# ROUTER
# =====================================================

router = APIRouter()

# =====================================================
# ENV VARIABLES
# =====================================================

TWILIO_ACCOUNT_SID = os.getenv(
    "TWILIO_ACCOUNT_SID"
)

TWILIO_AUTH_TOKEN = os.getenv(
    "TWILIO_AUTH_TOKEN"
)

TWILIO_PHONE_NUMBER = os.getenv(
    "TWILIO_PHONE_NUMBER"
)

GROQ_API_KEY = os.getenv(
    "GROQ_API_KEY"
)

# =====================================================
# CLIENTS
# =====================================================

client = Client(
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN
)

groq_client = Groq(
    api_key=GROQ_API_KEY
)

# =====================================================
# NGROK URL
# =====================================================

BASE_URL = (
    "https://snagged-steep-shadow.ngrok-free.dev"
)

# =====================================================
# TEST
# =====================================================

@router.get("/test")
async def test():

    return {
        "success": True,
        "message": "Twilio Working ✅"
    }

# =====================================================
# REQUEST MODEL
# =====================================================

class DoctorCallRequest(BaseModel):

    phone: str

    name: str = "Patient"

    doctor: str = "Doctor"

# =====================================================
# START CALL
# =====================================================

@router.post("/doctor-call")
async def doctor_call(
    data: DoctorCallRequest
):

    try:

        call = client.calls.create(

            to=data.phone,

            from_=TWILIO_PHONE_NUMBER,

            url=f"{BASE_URL}/api/twilio/voice"
        )

        return {

            "success": True,

            "sid": call.sid,

            "status": call.status
        }

    except Exception as e:

        traceback.print_exc()

        return {

            "success": False,

            "error": str(e)
        }

# =====================================================
# INITIAL AI SPEECH
# =====================================================

@router.post("/voice")
async def voice():

    response = VoiceResponse()

    gather = Gather(

        input="speech",

        action=f"{BASE_URL}/api/twilio/process-speech",

        method="POST",

        speechTimeout="auto"
    )

    gather.say(

        """
        Hello.
        I am your AI healthcare assistant.
        Please tell me how you are feeling today.
        """,

        voice="alice"
    )

    response.append(gather)

    return Response(

        content=str(response),

        media_type="application/xml"
    )

# =====================================================
# PROCESS SPEECH
# =====================================================

@router.post("/process-speech")
async def process_speech(
    request: Request
):

    try:

        form = await request.form()

        speech_text = form.get(
            "SpeechResult"
        )

        print("\nPATIENT:", speech_text)

        response = VoiceResponse()

        # =========================================
        # EMPTY SPEECH
        # =========================================

        if not speech_text:

            gather = Gather(

                input="speech",

                action=f"{BASE_URL}/api/twilio/process-speech",

                method="POST",

                speechTimeout="auto"
            )

            gather.say(

                "I could not hear you. Please speak again.",

                voice="alice"
            )

            response.append(gather)

            return Response(

                content=str(response),

                media_type="application/xml"
            )

        # =========================================
        # AI REPLY
        # =========================================

        ai_reply = (
            "I understand. "
            "Can you tell me more?"
        )

        try:

            completion = groq_client.chat.completions.create(

                model="llama-3.3-70b-versatile",

                messages=[

                    {
                        "role": "system",

                        "content":
                        """
                        You are a smart healthcare AI assistant.

                        Reply naturally like a doctor.

                        Keep responses:
                        short,
                        conversational,
                        and caring.

                        Always continue the conversation.
                        """
                    },

                    {
                        "role": "user",

                        "content": speech_text
                    }
                ],

                temperature=0.7,

                max_tokens=100
            )

            ai_reply = (
                completion
                .choices[0]
                .message
                .content
                .strip()
            )

            print("\nAI:", ai_reply)

        except Exception as groq_error:

            print("\n========== GROQ ERROR ==========")

            traceback.print_exc()

            print("================================")

        # =========================================
        # CONTINUOUS CONVERSATION
        # =========================================

        gather = Gather(

            input="speech",

            action=f"{BASE_URL}/api/twilio/process-speech",

            method="POST",

            speechTimeout="auto"
        )

        gather.say(

            ai_reply,

            voice="alice"
        )

        response.append(gather)

        return Response(

            content=str(response),

            media_type="application/xml"
        )

    except Exception as e:

        print("\n========== ERROR ==========")

        traceback.print_exc()

        print("===========================\n")

        response = VoiceResponse()

        response.say(

            "Internal server error.",

            voice="alice"
        )

        return Response(

            content=str(response),

            media_type="application/xml"
        )