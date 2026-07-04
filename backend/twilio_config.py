from twilio.rest import Client
from dotenv import load_dotenv

import os

load_dotenv()

ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE = os.getenv("TWILIO_PHONE_NUMBER")

client = Client(
    ACCOUNT_SID,
    AUTH_TOKEN
)