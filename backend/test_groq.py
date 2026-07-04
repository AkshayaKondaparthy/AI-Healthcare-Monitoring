from services.groq_service import ask_ai
from services.tts_service import speak

reply = ask_ai(
    "Patient has fever and headache"
)

print(reply)

speak(reply)