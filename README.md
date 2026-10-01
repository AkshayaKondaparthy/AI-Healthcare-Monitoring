# 🏥 Patient Post-Discharge AI Agent

> An AI-powered post-discharge monitoring system for automated patient follow-ups, conversational check-ins, symptom analysis, risk detection, alerts, and continuous recovery monitoring.

## 📌 Overview

Patients often need continued monitoring after leaving the hospital, particularly for medication adherence, symptom tracking, follow-up appointments, and early identification of potential complications.

The **Patient Post-Discharge AI Agent** automates this workflow by combining:

- 🤖 AI agent and LLM-based analysis
- 📞 Voice and chat communication
- 🎙️ Speech-to-text and text-to-speech
- 🗄️ Structured patient and interaction data
- 📊 Real-time monitoring and dashboard
- 🚨 Risk-based alerts and follow-up actions

The monitoring cycle continues until the patient's recovery plan is completed or monitoring is no longer required. fileciteturn0file0L3-L30

---

## ✨ Key Features

### 1. 🏥 Discharge Trigger
- Starts the AI agent after patient discharge.
- Captures patient and discharge information.
- Records consent and communication preferences.

### 2. 📅 Automated Follow-Up
- Schedules follow-up calls or messages.
- Supports condition-based scheduling.
- Maintains a recurring monitoring workflow.

### 3. 💬 AI Patient Conversation
The agent can communicate through supported channels such as voice calls and chat and collect information about:

- Symptoms
- Pain level
- Medication-related issues
- Recovery progress
- Other patient concerns

### 4. 🎙️ Voice Recording & Transcription
- Records calls where applicable.
- Converts speech into text.
- Stores transcripts for analysis and future reference.

### 5. 🤖 AI Analysis
The AI analyzes patient responses to:

- Extract symptoms
- Identify pain levels and issues
- Detect potentially concerning responses
- Classify risk
- Generate recommended actions

### 6. 🚨 Risk Classification

| Status | Action |
|---|---|
| 🟢 **Stable** | Continue normal monitoring |
| 🟠 **Moderate Risk** | Increase follow-up frequency |
| 🔴 **High Risk** | Alert the doctor/care team |

Risk classification is intended as a decision-support mechanism and should not replace clinical judgment or emergency medical care. fileciteturn0file0L96-L138

### 7. 🔄 Continuous Monitoring
- Tracks patient progress.
- Updates patient status.
- Repeats follow-ups until recovery or plan completion.
- Maintains interaction and action history.

---

# 🏗️ System Architecture

## High-Level Workflow

```text
┌────────────────────────────┐
│ Patient / Discharge Data   │
│ • Patient Details          │
│ • Discharge Summary        │
│ • Hospital / EHR           │
│ • Care Team Input          │
└─────────────┬──────────────┘
              ↓
┌────────────────────────────┐
│      Discharge Trigger     │
└─────────────┬──────────────┘
              ↓
┌────────────────────────────┐
│   Daily Follow-Up Scheduler│
└─────────────┬──────────────┘
              ↓
┌────────────────────────────┐
│    AI Patient Conversation │
│      Voice / Chat          │
└─────────────┬──────────────┘
              ↓
┌────────────────────────────┐
│   Record & Transcribe      │
└─────────────┬──────────────┘
              ↓
┌────────────────────────────┐
│ AI Analysis & Risk Detection│
└─────────────┬──────────────┘
              ↓
┌────────────────────────────┐
│       Alert & Action        │
└─────────────┬──────────────┘
              ↓
┌────────────────────────────┐
│   Continuous Monitoring     │
└─────────────┬──────────────┘
              │
              └──────→ Repeat until recovery
```

The overall flow is **Discharge → Follow-Up → Conversation → Transcription → AI Analysis → Risk Detection → Action → Continuous Monitoring**. fileciteturn0file0L140-L182

---

# 🧩 Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend | FastAPI |
| Database | PostgreSQL |
| LLM | Groq API |
| Speech-to-Text | Sarvam / Google Speech-to-Text |
| Text-to-Speech | Sarvam / Google Text-to-Speech |
| Calling | Twilio |
| Real-Time Communication | WebRTC |
| Containerization | Docker |
| Cloud Deployment | AWS / Azure / GCP |
| Web Server / Reverse Proxy | Nginx |

> The exact services may vary depending on the deployment environment and project configuration. fileciteturn0file0L184-L234

---

# 🔧 Backend API

The backend is designed around FastAPI endpoints.

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/start-agent` | Start the post-discharge agent workflow |
| `POST` | `/process-input` | Process patient responses |
| `POST` | `/generate-response` | Generate an AI response using the LLM |
| `POST` | `/log` | Store interaction and workflow logs |

### API Workflow

```text
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
```

fileciteturn0file0L236-L278

---

# 🗄️ Database Design

The PostgreSQL database can maintain the following core tables:

### `users`
Stores patient and user information.

**Possible fields:**
- User ID
- Name
- Phone
- Diagnosis
- Consent
- Communication preference

### `interactions`
Stores patient-agent conversations.

**Possible fields:**
- Interaction ID
- User ID
- Timestamp
- Patient input
- AI response
- Channel

### `agent_tasks`
Stores scheduled and completed agent tasks.

**Possible fields:**
- Task ID
- User ID
- Task type
- Scheduled time
- Status

### `call_logs`
Stores calling-related information.

**Possible fields:**
- Call ID
- User ID
- Call status
- Recording reference
- Timestamp

### `status_tracking`
Tracks the patient's monitoring status.

**Possible fields:**
- User ID
- Risk level
- Symptoms
- Pain level
- Last interaction
- Next follow-up
- Recovery status

fileciteturn0file0L280-L370

---

# 🤖 AI Agent Workflow

The AI agent follows a structured seven-step workflow:

### Step 1 — Patient Context
Receives relevant information such as:

- Patient details
- Diagnosis
- Discharge summary
- Medications
- Care instructions
- Previous interactions

### Step 2 — Patient Interaction
Communicates through supported channels:

- Voice call
- Chat
- Messaging

### Step 3 — Response Processing
Records patient responses and converts them into structured information.

### Step 4 — AI Analysis
The LLM identifies:

- Symptoms
- Pain level
- Medication concerns
- Recovery issues
- Potential warning signs

### Step 5 — Risk Classification
Assigns a monitoring category using configured rules and AI analysis.

### Step 6 — Action
The workflow can:

- Continue normal monitoring
- Increase follow-up frequency
- Notify the care team

### Step 7 — Continuous Monitoring
Updates the patient's status and continues the follow-up cycle. fileciteturn0file0L372-L436

---

# 🔐 Security & Compliance

Because the system may process sensitive healthcare information, security should be considered throughout the application.

The architecture includes considerations for:

- End-to-end encryption for data in transit and appropriate encryption at rest
- Role-based access control
- Secure authentication and authorization
- Audit logs and activity monitoring
- Patient consent management
- Secure API communication
- Environment-variable based secret management
- Least-privilege database and service access
- Applicable healthcare privacy and regulatory requirements

> Before real-world deployment with patient data, compliance should be validated with qualified security, legal, and healthcare professionals. fileciteturn0file0L438-L462

---

# 🔗 Integrations

The architecture supports integration with:

- 🏥 EHR / HIS systems
- 💬 WhatsApp
- 📱 SMS gateways
- ✉️ Email services
- ☁️ Cloud storage
- 📞 Twilio
- 🎙️ Speech-to-text services
- 🔊 Text-to-speech services
- 🤖 LLM APIs

fileciteturn0file0L464-L484

---

# 📊 Monitoring Dashboard

The frontend dashboard can provide healthcare teams with:

- Patient list
- Patient status
- Risk alerts
- Follow-up history
- Interaction logs
- Call status
- Patient progress
- Monitoring information
- Notifications

### Patient Status

```text
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
```

fileciteturn0file0L486-L519

---

# 🚀 Getting Started

## Prerequisites

Install:

- Node.js
- Python 3.10+
- PostgreSQL
- Git
- Docker *(optional)*
- Required API credentials

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/AkshayaKondaparthy/AI-Healthcare-Monitoring.git
cd AI-Healthcare-Monitoring
```

### 2. Backend Setup

Create a virtual environment:

```bash
python -m venv venv
```

**Windows:**

```bash
venv\Scriptsctivate
```

**Linux/macOS:**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

API:

```text
http://localhost:8000
```

Swagger documentation:

```text
http://localhost:8000/docs
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

fileciteturn0file0L521-L588

---

# 🔑 Environment Variables

Create a `.env` file for local configuration.

Example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/post_discharge_agent

GROQ_API_KEY=your_groq_api_key

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

SARVAM_API_KEY=your_sarvam_api_key

GOOGLE_APPLICATION_CREDENTIALS=path_to_google_credentials
```

### ⚠️ Never commit secrets

Do **not** upload:

- API keys
- Passwords
- Access tokens
- Database credentials
- Private patient information
- Real medical records
- Call recordings

Recommended `.gitignore` entries:

```gitignore
.env
.env.*
venv/
__pycache__/
node_modules/
*.pyc
*.log
```

fileciteturn0file0L590-L618

---

# 🐳 Docker

The architecture can be containerized using Docker.

```bash
docker build -t patient-post-discharge-agent .
docker run -p 8000:8000 patient-post-discharge-agent
```

A multi-service Docker Compose deployment can include:

```text
Frontend
Backend
PostgreSQL
Nginx
```

fileciteturn0file0L620-L635

---

# 📁 Project Structure

Based on the current repository structure:

```text
AI-Healthcare-Monitoring/
│
├── ai/
├── backend/
├── database/
├── frontend/
├── .gitignore
└── README.md
```

The application architecture separates the AI, backend, database, and frontend components.

---

# 🔄 End-to-End Workflow

```text
1. Patient is discharged
          ↓
2. AI agent is triggered
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
```

---

# 📈 Key Benefits

- Early identification of potential risks
- Automated patient follow-ups
- Reduced manual monitoring workload
- Centralized interaction history
- Faster communication with care teams
- Continuous patient monitoring
- Scalable agent-based architecture
- Support for multiple communication channels
- Better visibility into patient recovery progress

fileciteturn0file0L690-L708

---

# 👥 Use Cases

The architecture can be adapted for:

- Post-surgery monitoring
- Chronic disease follow-up
- Medication adherence monitoring
- Recovery tracking
- Elderly patient follow-up
- Routine post-discharge check-ins
- Remote patient monitoring workflows

fileciteturn0file0L744-L760

---

# 🔮 Future Enhancements

- Integration with additional EHR/HIS systems
- Multilingual patient conversations
- Personalized follow-up schedules
- Medication reminder functionality
- Sentiment and emotion-aware conversations
- Advanced patient trend analysis
- Real-time doctor notifications
- Mobile application for patients
- Improved clinical rule engines
- Explainable AI for risk classification
- Analytics and reporting for healthcare teams
- Human-in-the-loop escalation workflows

fileciteturn0file0L718-L742

---

# 🛠️ Development Status

**Status:** 🚧 In Development

The architecture describes the intended end-to-end workflow. Individual integrations and implementation details may vary depending on the current project version. fileciteturn0file0L762-L766

---

# ⚠️ Medical Safety Disclaimer

This project is intended as a **technical/educational AI healthcare workflow and decision-support system**.

It is **not a replacement for doctors, nurses, emergency services, or professional medical judgment**.

AI-generated risk classifications and recommendations may be incorrect or incomplete. Real-world deployment should include appropriate clinical validation, human oversight, privacy controls, security testing, regulatory review, and emergency escalation procedures. fileciteturn0file0L710-L716

---

# 👩‍💻 Author

**Akshaya Kondaparthy**

GitHub: [AkshayaKondaparthy](https://github.com/AkshayaKondaparthy)

---

# ⭐ Technologies & Acknowledgements

This project uses technologies including:

- React.js
- FastAPI
- PostgreSQL
- Groq API
- Twilio
- WebRTC
- Sarvam AI
- Google Cloud services
- Docker
- Nginx

---

## 📌 Architecture Summary

```text
Patient Input
      ↓
AI Agent
      ↓
Voice / Chat Communication
      ↓
Speech-to-Text
      ↓
AI Analysis
      ↓
Risk Detection
      ↓
Alerts & Actions
      ↓
Continuous Monitoring
```

**Patient Post-Discharge AI Agent — AI-assisted monitoring from discharge to recovery.**
