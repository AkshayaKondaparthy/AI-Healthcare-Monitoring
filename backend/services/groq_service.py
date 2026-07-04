from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def ask_ai(message):

    response = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {
                "role": "system",
                "content": """
                You are an empathetic AI healthcare assistant.

                Your responsibilities:
                - Help patients after hospital discharge
                - Provide medication reminders
                - Suggest healthy lifestyle habits
                - Detect emergency symptoms
                - Encourage patients calmly and politely
                - Keep responses short, clear, and supportive
                - Avoid complicated medical jargon
                - If symptoms seem serious, advise immediate medical attention

                Speak like a caring healthcare assistant.
                """
            },

            {
                "role": "user",
                "content": message
            }

        ]
    )

    return response.choices[0].message.content
