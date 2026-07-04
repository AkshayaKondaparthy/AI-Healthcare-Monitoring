from datetime import datetime

from services.stt_service import listen
from services.groq_service import ask_ai
from services.tts_service import speak

from services.translation_service import (
    translate_to_english,
    translate_to_telugu
)

# Emergency keywords
EMERGENCY_KEYWORDS = [
    "chest pain",
    "heart attack",
    "can't breathe",
    "breathing problem",
    "difficulty breathing",
    "unconscious",
    "blood",
    "stroke",
    "severe pain",
    "emergency",
    "suicide",
    "fainted",
    "critical",
    "help me"
]

# Conversation history
conversation_history = []


def detect_emergency(text):

    text = text.lower()

    for keyword in EMERGENCY_KEYWORDS:

        if keyword in text:
            return True

    return False


def log_conversation(role, message):

    timestamp = datetime.now().strftime(
        "%Y-%m-%d %H:%M:%S"
    )

    log = f"[{timestamp}] {role}: {message}"

    conversation_history.append(log)

    print(log)


# Startup Greeting
welcome_message = """
Hello.
I am your AI healthcare assistant.
You may speak in English or Telugu.
How can I help you today?
"""

print("\nAI:", welcome_message)

speak(welcome_message)

# Main Loop
while True:

    user_text = listen()

    if not user_text:
        continue

    log_conversation("PATIENT", user_text)

    # Exit condition
    if user_text.lower() in ["exit", "stop", "bye"]:

        goodbye = """
        Goodbye.
        Stay healthy and take care.
        """

        log_conversation("AI", goodbye)

        speak(goodbye)

        break

    # Telugu → English
    english_text = translate_to_english(user_text)

    print("\nTranslated:", english_text)

    # Emergency Detection
    if detect_emergency(english_text):

        emergency_reply = """
        I detected a possible medical emergency.
        Please contact emergency services
        or visit the nearest hospital immediately.
        """

        print("\n🚨 EMERGENCY DETECTED")

        log_conversation(
            "EMERGENCY",
            english_text
        )

        log_conversation("AI", emergency_reply)

        # English → Telugu
        telugu_emergency = translate_to_telugu(
            emergency_reply
        )

        print("\nTelugu:", telugu_emergency)

        speak(telugu_emergency, lang="te")

        # Future integrations
        # send_sms_alert()
        # trigger_doctor_call()
        # notify_hospital()

        continue

    # Ask AI
    ai_reply = ask_ai(english_text)

    log_conversation("AI", ai_reply)

    # English → Telugu
    telugu_reply = translate_to_telugu(ai_reply)

    print("\nTelugu:", telugu_reply)

    # Telugu Voice
    speak(telugu_reply, lang="te")


# Save conversation history
with open("conversation_log.txt", "w", encoding="utf-8") as file:

    for log in conversation_history:
        file.write(log + "\n")

print("\nConversation saved successfully.")