from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from database import Base
from database import engine

# =========================================================
# ROUTES
# =========================================================

from routes import patient
from routes import logs
from routes import agent
from routes import auth_routes

from routes.ai import router as ai_router

from routes.twilio_routes import (
    router as twilio_router
)

# =========================================================
# SOCKET SERVER
# =========================================================

from socket_server import sio

import socketio

# =========================================================
# FASTAPI APP
# =========================================================

app = FastAPI(

    title="AI Patient Monitoring System",

    version="2.0.0",

    description=
    "AI Powered Healthcare Monitoring Platform"
)

# =========================================================
# DATABASE
# =========================================================

Base.metadata.create_all(
    bind=engine
)

# =========================================================
# CORS
# =========================================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# =========================================================
# API ROUTES
# =========================================================

app.include_router(
    auth_routes.router
)

app.include_router(
    patient.router
)

app.include_router(
    logs.router
)

app.include_router(
    agent.router
)

app.include_router(
    ai_router
)

app.include_router(
    twilio_router,
    prefix="/api/twilio",
    tags=["Twilio"]
)

# =========================================================
# ROOT ROUTE
# =========================================================

@app.get("/")

async def root():

    return {

        "success": True,

        "message":
        "AI Healthcare Backend Running 🚀"
    }

# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/health")

async def health_check():

    return {

        "status": "healthy",

        "database": "connected",

        "socketio": "running"
    }

# =========================================================
# SOCKET.IO APP
# =========================================================

socket_app = socketio.ASGIApp(

    sio,

    other_asgi_app=app
)