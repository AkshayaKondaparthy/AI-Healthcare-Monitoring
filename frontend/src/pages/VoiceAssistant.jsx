import React, { useEffect, useState } from "react";
import socket from "../services/socket";

export default function VoiceAssistant() {

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  useEffect(() => {

    socket.on("ai_reply", (data) => {

      setReply(data.message);
    });

  }, []);

  const sendMessage = () => {

    socket.emit("patient_message", {
      text: message
    });

    setMessage("");
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold">
        AI Healthcare Assistant
      </h1>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Speak or type..."
        className="border p-2 w-full mt-5"
      />

      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-5 py-2 mt-4"
      >
        Send
      </button>

      <div className="mt-6">
        <h2 className="font-bold">AI Reply:</h2>

        <p>{reply}</p>
      </div>

    </div>
  );
}