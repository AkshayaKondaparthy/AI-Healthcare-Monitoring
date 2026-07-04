from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from routes.twilio_routes import router as twilio_router

from database import Base, engine, SessionLocal
from models import Patient

# ==========================================
# SOCKET SERVER IMPORT
# ==========================================

from socket_server import socket_app

# Routers
from routes import patient
from routes import logs
from routes import agent
from routes.ai import router as ai_router
from routes import auth_routes

import asyncio

# ==========================================
# APP INITIALIZATION
# ==========================================

app = FastAPI(
    title="AI Patient Monitoring System",
    description="Post-discharge patient monitoring using AI agents",
    version="2.0.0"
)

# ==========================================
# DATABASE INIT
# ==========================================

Base.metadata.create_all(bind=engine)

# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# SOCKET.IO / WEBRTC
# ==========================================

app.mount("/ws", socket_app)

# ==========================================
# INCLUDE ROUTES
# ==========================================

app.include_router(patient.router)
app.include_router(logs.router)
app.include_router(agent.router)
app.include_router(ai_router)
app.include_router(auth_routes.router)


app.include_router(
    twilio_router,
    prefix="/api/twilio"
)

# ==========================================
# ROOT
# ==========================================

@app.get("/")
def root():

    return {
        "message": "AI Patient Monitoring Backend Running 🚀"
    }

