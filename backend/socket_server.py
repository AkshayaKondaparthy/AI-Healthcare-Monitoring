import socketio

# =========================================================
# SOCKET SERVER
# =========================================================

sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*"
)

socket_app = socketio.ASGIApp(sio)

# =========================================================
# STORAGE
# =========================================================

connected_users = {}

rooms = {}

# =========================================================
# CONNECT
# =========================================================

@sio.event
async def connect(sid, environ):

    print("✅ CONNECTED:", sid)

# =========================================================
# DISCONNECT
# =========================================================

@sio.event
async def disconnect(sid):

    print("❌ DISCONNECTED:", sid)

    # Remove disconnected user
    for user_id in list(connected_users.keys()):

        if connected_users[user_id] == sid:

            del connected_users[user_id]

    # Remove from rooms
    for room_id in rooms:

        if sid in rooms[room_id]:

            rooms[room_id].remove(sid)

            await sio.emit(
                "user_left",
                {
                    "sid": sid
                },
                room=room_id
            )

# =========================================================
# REGISTER USER
# =========================================================

@sio.event
async def register(sid, data):

    user_id = data["userId"]

    connected_users[user_id] = sid

    print(f"👤 REGISTERED: {user_id}")

# =========================================================
# JOIN ROOM
# =========================================================

@sio.event
async def join_room(sid, data):

    room_id = data["roomId"]

    await sio.enter_room(sid, room_id)

    if room_id not in rooms:

        rooms[room_id] = []

    rooms[room_id].append(sid)

    print(f"🏠 {sid} joined {room_id}")

    await sio.emit(
        "user_joined",
        {
            "sid": sid
        },
        room=room_id,
        skip_sid=sid
    )

# =========================================================
# OFFER
# =========================================================

@sio.event
async def offer(sid, data):

    await sio.emit(
        "offer",
        {
            "offer": data["offer"],
            "from": sid
        },
        room=data["roomId"],
        skip_sid=sid
    )

# =========================================================
# ANSWER
# =========================================================

@sio.event
async def answer(sid, data):

    await sio.emit(
        "answer",
        {
            "answer": data["answer"],
            "from": sid
        },
        room=data["roomId"],
        skip_sid=sid
    )

# =========================================================
# ICE CANDIDATES
# =========================================================

@sio.event
async def ice_candidate(sid, data):

    await sio.emit(
        "ice_candidate",
        {
            "candidate": data["candidate"],
            "from": sid
        },
        room=data["roomId"],
        skip_sid=sid
    )

# =========================================================
# CALL CHAT
# =========================================================

@sio.event
async def call_chat(sid, data):

    await sio.emit(
        "call_chat",
        {
            "message": data["message"],
            "sender": data["sender"]
        },
        room=data["roomId"]
    )

# =========================================================
# SCREEN SHARE
# =========================================================

@sio.event
async def screen_share_started(sid, data):

    await sio.emit(
        "screen_share_started",
        {
            "sid": sid
        },
        room=data["roomId"],
        skip_sid=sid
    )

# =========================================================
# SCREEN SHARE STOPPED
# =========================================================

@sio.event
async def screen_share_stopped(sid, data):

    await sio.emit(
        "screen_share_stopped",
        {
            "sid": sid
        },
        room=data["roomId"],
        skip_sid=sid
    )

# =========================================================
# RECORDING STARTED
# =========================================================

@sio.event
async def recording_started(sid, data):

    await sio.emit(
        "recording_started",
        {
            "sid": sid
        },
        room=data["roomId"]
    )

# =========================================================
# RECORDING STOPPED
# =========================================================

@sio.event
async def recording_stopped(sid, data):

    await sio.emit(
        "recording_stopped",
        {
            "sid": sid
        },
        room=data["roomId"]
    )

# =========================================================
# END CALL
# =========================================================

@sio.event
async def end_call(sid, data):

    room_id = data["roomId"]

    await sio.emit(
        "call_ended",
        {
            "sid": sid
        },
        room=room_id
    )

    print(f"📴 CALL ENDED: {room_id}")

# =========================================================
# AI CHAT
# =========================================================

@sio.event
async def patient_message(sid, data):

    print("💬 PATIENT:", data)

    await sio.emit(
        "ai_reply",
        {
            "message": "🤖 AI analyzing health data..."
        },
        room=sid
    )