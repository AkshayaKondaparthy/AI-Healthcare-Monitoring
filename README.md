# 🏥 AI Patient Post-Discharge Monitoring System

## 📌 Overview

This project is an **AI-powered healthcare system** designed to monitor patients after hospital discharge.
It tracks patient recovery, detects risks based on symptoms and vitals, and alerts healthcare providers when necessary.

The system uses **AI agents, real-time interaction, and automated workflows** to ensure patient safety and continuous monitoring.

---

## 🚀 Features

* 📊 **Patient Dashboard** – View patient status, risk levels, and analytics
* 🤖 **AI Interaction** – Automated patient follow-up using LLM (Groq API)
* ⚠️ **Risk Detection** – Detects normal, moderate, and critical conditions
* 🚨 **Alerts System** – Generates alerts for critical cases
* 📜 **Logs Tracking** – Stores all interactions and actions
* 🔄 **Workflow Automation** – End-to-end AI agent pipeline
* 🎙️ **Voice Support (Optional)** – STT/TTS + Twilio integration

---

## 🧠 System Workflow

1. Trigger Event (patient discharge / manual input)
2. Fetch patient data from database
3. Create AI context
4. Generate response using Groq LLM
5. Communicate via chat/voice
6. Process speech (STT/TTS)
7. Decision engine (continue / alert / close)
8. Log all actions

---

## 🏗️ Architecture

Frontend (React) → Backend (FastAPI) → AI (Groq) → Database (PostgreSQL) → Communication (Twilio/WebRTC)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* CSS
* Recharts (data visualization)

### Backend

* FastAPI
* Python

### Database

* PostgreSQL

### AI / Integrations

* Groq API (LLM)
* Twilio (calling)
* WebRTC (real-time communication)
* Google/Sarvam STT & TTS

---

## 📂 Project Structure

```
patient-post-discharge-agent/
│
├── frontend/       # React UI
├── backend/        # FastAPI APIs
├── database/       # PostgreSQL schema
├── ai/             # AI + integrations
├── docs/           # Documentation
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/patient-post-discharge-agent.git
cd patient-post-discharge-agent
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Runs on 👉 [http://localhost:3000](http://localhost:3000)

---

### 3️⃣ Backend Setup

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

Runs on 👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🔌 API Endpoints

| Endpoint             | Description             |
| -------------------- | ----------------------- |
| `/start-agent`       | Trigger agent workflow  |
| `/process-input`     | Handle patient response |
| `/generate-response` | Generate AI response    |
| `/log`               | Store logs              |

---

## 📊 Dashboard Modules

* System Control (Start/Stop AI)
* Patient Overview
* Recovery Trends (charts)
* Risk Distribution
* Live Alerts
* Activity Logs

---

## 👥 Team Roles

* 👤 Frontend – UI, Dashboard, API integration
* 👤 Backend – APIs, workflow logic
* 👤 Database – Schema, storage
* 👤 AI/Integrations – LLM, decision engine, voice

---

## 🔮 Future Enhancements

* Real-time WebSocket updates
* IoT device integration
* Advanced ML-based risk prediction
* Deployment (Docker + Cloud)

---

## 🎯 Conclusion

This project demonstrates a **real-world AI healthcare solution** that automates patient monitoring and improves post-discharge care using modern full-stack and AI technologies.

---

## ⭐ Acknowledgment

Built as part of an AI + Full Stack project for learning and innovation in healthcare systems.

---

# 🎯 What you should do now

1. Create a file:

```
README.md
```

2. Paste this content
3. Replace:

```
your-username
```

with your GitHub username


