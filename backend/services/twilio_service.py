from twilio.rest import Client
from dotenv import load_dotenv
import os

load_dotenv()

account_sid = os.getenv("TWILIO_ACCOUNT_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
twilio_number = os.getenv("TWILIO_PHONE_NUMBER")

client = Client(account_sid, auth_token)


def make_call(patient_name, phone_number):
    call = client.calls.create(
        to=phone_number,
        from_=twilio_number,
        twiml=f"""
        <Response>
            <Say voice="alice">
                Hello {patient_name}.
                This is your AI healthcare assistant.
                Please take your medication on time.
                If you feel unwell, contact your doctor immediately.
            </Say>
        </Response>
        """
    )

    return call.sid