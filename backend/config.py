import os
from dotenv import load_dotenv

load_dotenv()

# PostgreSQL Database URL
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:akshaya@localhost:5432/patient_ai"
)

# Groq API Key
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")