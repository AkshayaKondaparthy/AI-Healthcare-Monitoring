🏥 Patient Post-Discharge AI Agent

An AI-powered post-discharge monitoring system designed to support patients after leaving the hospital through automated follow-ups, conversational check-ins, symptom analysis, risk detection, alerts, and continuous monitoring.

The system combines an AI agent, voice/chat communication, speech-to-text, large language models, a structured database, and real-time monitoring to help care teams identify potential risks early and take appropriate action.

📌 Overview

Patients can require monitoring after discharge, especially when they need medication adherence, symptom tracking, follow-up appointments, or observation for possible complications.

The Patient Post-Discharge AI Agent automates the post-discharge follow-up workflow:

Hospital Discharge
       ↓
Discharge Trigger
       ↓
Daily Follow-Up
       ↓
Patient Conversation
       ↓
Record & Transcribe
       ↓
AI Analysis & Risk Detection
       ↓
Alert & Action
       ↓
Continuous Monitoring
       ↺

The monitoring loop continues until the patient's recovery plan is completed or monitoring is no longer required.

🎯 Objectives

Automate post-discharge patient follow-ups.

Collect patient symptoms, pain levels, medication-related issues, and concerns.

Convert voice conversations into text for analysis.

Use an LLM to extract symptoms and classify risk.

Notify doctors/care teams when potential risks are detected.

Maintain interaction and follow-up history.

Provide a real-time dashboard for monitoring patient status.

Support continuous monitoring until recovery or care-plan completion.

Reduce manual follow-up workload for healthcare teams.

✨ Key Features

1. Discharge Trigger

Starts the AI agent after patient discharge.

Captures patient details and discharge information.

Records consent and communication preferences.

2. Automated Daily Follow-Up

Schedules follow-up calls or messages.

Supports condition-based scheduling.

Maintains a recurring monitoring workflow.

3. AI Patient Conversation

Conducts friendly patient conversations.

Supports voice calls and chat.

Asks about:

Symptoms

Pain level

Medication-related issues

Recovery progress

Other patient concerns

4. Voice Recording & Transcription

Records patient calls where applicable.

Converts speech to text.

Stores conversation transcripts for analysis and future reference.

5. AI Analysis

The AI agent analyzes patient responses to:

Extract symptoms.

Identify pain levels and issues.

Detect potentially concerning responses.

Classify patient risk.

Generate recommended actions.

6. Risk Classification

Patient status can be categorized into:

🟢 Stable – Continue normal monitoring.

🟠 Moderate Risk – Increase follow-up frequency.

🔴 High Risk – Alert the doctor/care team immediately.

Risk classification is intended as a decision-support mechanism and should not replace clinical judgment or emergency medical care.

7. Alerts & Actions

Depending on the detected risk:

High Risk     → Immediate doctor/care-team alert
Moderate Risk → Increase follow-up frequency
Stable        → Continue regular monitoring

8. Continuous Monitoring

Tracks patient progress over time.

Updates patient status.

Repeats follow-ups until recovery or plan completion.

Maintains a history of interactions and actions.

🏗️ System Architecture

High-Level Architecture

┌──────────────────────┐
│   Patient Details    │
│   Discharge Summary  │
│   Hospital / EHR     │
│   Care Team Input    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│   Discharge Trigger  │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Daily Follow-Up      │
│ Scheduler            │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ AI Patient           │
│ Conversation         │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Record & Transcribe  │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ AI Analysis &        │
│ Risk Detection       │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Alert & Action       │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Continuous Monitoring│
└──────────┬───────────┘
           │
           └──────────→ Repeat until recovery

🧩 Technology Stack

Layer

Technology

Frontend

React.js

Backend

FastAPI

Database

PostgreSQL

LLM

Groq API

Speech-to-Text

Sarvam / Google Speech-to-Text

Text-to-Speech

Sarvam / Google Text-to-Speech

Calling

Twilio

Real-Time Communication

WebRTC

Containerization

Docker

Cloud Deployment

AWS / Azure / GCP

Web Server / Reverse Proxy

Nginx

The exact services can be changed depending on the deployment environment and project configuration.

🔧 Backend API Structure

The backend is designed around FastAPI endpoints such as:

Endpoint

Purpose

POST /start-agent

Start the post-discharge agent workflow

POST /process-input

Process patient responses

POST /generate-response

Generate an AI response using the LLM

POST /log

Store interaction and workflow logs

Example workflow:

Frontend
   ↓
POST /start-agent
   ↓
Agent Workflow
   ↓
Patient Interaction
   ↓
POST /process-input
   ↓
AI Analysis
   ↓
POST /generate-response
   ↓
Risk / Action
   ↓
POST /log

🗄️ Database Design

The PostgreSQL database can maintain the following core tables:

users

Stores patient and user information.

Possible fields:

User ID

Name

Phone

Diagnosis

Consent

Communication preference

interactions

Stores patient-agent conversations.

Possible fields:

Interaction ID

User ID

Timestamp

Patient input

AI response

Channel

agent_tasks

Stores scheduled and completed agent tasks.

Possible fields:

Task ID

User ID

Task type

Scheduled time

Status

call_logs

Stores calling-related information.

Possible fields:

Call ID

User ID

Call status

Recording reference

Timestamp

status_tracking

Tracks the patient's monitoring status.

Possible fields:

User ID

Risk level

Symptoms

Pain level

Last interaction

Next follow-up

Recovery status

🤖 AI Agent Workflow

The AI agent follows a structured process:

Step 1 — Patient Context

The system receives relevant information such as:

Patient details

Diagnosis

Discharge summary

Medications

Care instructions

Previous interactions

Step 2 — Patient Interaction

The agent communicates with the patient through supported channels such as:

Voice call

Chat

Messaging

Step 3 — Response Processing

Patient responses are recorded and converted into structured information.

Step 4 — AI Analysis

The LLM processes the response and identifies:

Symptoms

Pain level

Medication concerns

Recovery issues

Potential warning signs

Step 5 — Risk Classification

The system assigns a monitoring category based on configured rules and AI analysis.

Step 6 — Action

The system determines the next workflow action, such as:

Continue normal monitoring.

Increase follow-up frequency.

Notify the care team.

Step 7 — Continuous Monitoring

The patient's status is updated and the follow-up cycle continues.

🔐 Security & Compliance Considerations

Because this system handles potentially sensitive healthcare information, security should be considered throughout the application.

Planned/architecture-level considerations include:

End-to-end encryption for data in transit and appropriate encryption at rest.

Role-based access control.

Secure authentication and authorization.

Audit logs and activity monitoring.

Patient consent management.

Secure API communication.

Environment-variable based secret management.

Least-privilege access to databases and services.

Healthcare privacy and regulatory requirements appropriate to the deployment region.

Compliance should be validated with qualified security, legal, and healthcare professionals before using the system with real patient data.

🔗 Integrations

The architecture supports integration with:

🏥 EHR / HIS systems

💬 WhatsApp

📱 SMS gateways

✉️ Email services

☁️ Cloud storage

📞 Twilio

🎙️ Speech-to-text services

🔊 Text-to-speech services

🤖 LLM APIs

📊 Dashboard

The frontend dashboard can provide healthcare teams with:

Patient list

Patient status

Risk alerts

Follow-up history

Interaction logs

Call status

Patient progress

Monitoring information

Notifications

Example status view:

Patient Status
│
├── 🟢 Stable
│      └── Continue monitoring
│
├── 🟠 Moderate Risk
│      └── Increase follow-ups
│
└── 🔴 High Risk
       └── Notify care team

🚀 Getting Started

Prerequisites

Install the following:

Node.js

Python 3.10+

PostgreSQL

Git

Docker (optional)

API credentials for the services used by the project

📥 Installation

1. Clone the Repository

git clone https://github.com/<your-username>/<your-repository>.git
cd <your-repository>

2. Backend Setup

Create a virtual environment:

python -m venv venv

Activate it on Windows:

venv\Scripts\activate

Activate it on Linux/macOS:

source venv/bin/activate

Install dependencies:

pip install -r requirements.txt

Start the FastAPI server:

uvicorn main:app --reload

The API will normally be available at:

http://localhost:8000

FastAPI documentation:

http://localhost:8000/docs

3. Frontend Setup

Move into the frontend directory:

cd frontend

Install dependencies:

npm install

Start the React development server:

npm run dev

🔑 Environment Variables

Create a .env file for configuration and secrets.

Example:

DATABASE_URL=postgresql://username:password@localhost:5432/post_discharge_agent

GROQ_API_KEY=your_groq_api_key

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

SARVAM_API_KEY=your_sarvam_api_key

GOOGLE_APPLICATION_CREDENTIALS=path_to_google_credentials

⚠️ Important

Never commit API keys, passwords, tokens, database credentials, or private patient information to GitHub.

Add the following to .gitignore:

.env
venv/
__pycache__/
node_modules/
*.pyc

🐳 Docker Deployment

The architecture can be containerized using Docker.

Example:

docker build -t patient-post-discharge-agent .
docker run -p 8000:8000 patient-post-discharge-agent

For a multi-service setup, Docker Compose can be used for:

Frontend
Backend
PostgreSQL
Nginx

📁 Suggested Project Structure

patient-post-discharge-agent/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── main.py
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── database/
│   ├── agents/
│   └── ...
│
├── tests/
│
├── .env.example
├── .gitignore
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
└── README.md

Adapt this structure to match the actual repository.

🔄 End-to-End Example

1. Patient is discharged
          ↓
2. Agent is automatically triggered
          ↓
3. Follow-up is scheduled
          ↓
4. AI contacts patient
          ↓
5. Patient reports symptoms
          ↓
6. Conversation is recorded/transcribed
          ↓
7. AI extracts relevant information
          ↓
8. Risk level is determined
          ↓
9. Appropriate alert/action is generated
          ↓
10. Patient status is updated
          ↓
11. Monitoring continues

📈 Key Benefits

Early identification of potential risks.

Automated patient follow-ups.

Reduced manual monitoring workload.

Centralized interaction history.

Faster communication with care teams.

Continuous patient monitoring.

Scalable agent-based architecture.

Support for multiple communication channels.

Better visibility into patient recovery progress.

⚠️ Medical Safety Disclaimer

This project is intended as a technical/educational AI healthcare workflow and decision-support system.

It should not be used as a replacement for doctors, nurses, emergency services, or professional medical judgment.

AI-generated risk classifications and recommendations may be incorrect or incomplete. Any real-world deployment should include appropriate clinical validation, human oversight, privacy controls, security testing, regulatory review, and emergency escalation procedures.

🔮 Future Enhancements

Integration with additional EHR/HIS systems.

Multilingual patient conversations.

Personalized follow-up schedules.

Medication reminder functionality.

Sentiment and emotion-aware conversations.

Advanced patient trend analysis.

Real-time doctor notifications.

Mobile application for patients.

Improved clinical rule engines.

Explainable AI for risk classification.

Analytics and reporting for healthcare teams.

Human-in-the-loop escalation workflows.

👥 Use Cases

The architecture can be adapted for:

Post-surgery monitoring

Chronic disease follow-up

Medication adherence monitoring

Recovery tracking

Elderly patient follow-up

Routine post-discharge check-ins

Remote patient monitoring workflows

🛠️ Development Status

Project Status: 🚧 In Development

The architecture defines the intended end-to-end workflow. Individual integrations and implementation details may vary depending on the current version of the project.

📜 License

Add your preferred license here, for example:

MIT License

If this project is not intended to be open source, remove the license section or add the appropriate repository-specific terms.

👩‍💻 Author

Akshaya Kondaparthy

GitHub: https://github.com/<your-username>

⭐ Acknowledgements

This project uses concepts and technologies from:

React.js

FastAPI

PostgreSQL

Groq

Twilio

WebRTC

Sarvam AI

Google Cloud services

Docker

Nginx

📌 Architecture

The repository's architecture includes:

Patient Input → AI Agent → Communication → Transcription → AI Analysis → Risk Detection → Alerts → Continuous Monitoring

The complete architecture diagram is included in the project repository.