from twilio.rest import Client
from dotenv import load_dotenv
import os

load_dotenv()

account_sid = os.getenv("TWILIO_ACCOUNT_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
twilio_number = os.getenv("TWILIO_PHONE_NUMBER")

print("SID:", account_sid)   # DEBUG LINE (important)

client = Client(account_sid, auth_token)

call = client.calls.create(
    to="+91XXXXXXXXXX",
    from_=twilio_number,
    twiml="""
    <Response>
        <Say>Hello, this is a test AI call.</Say>
    </Response>
    """
)

print("Call SID:", call.sid)