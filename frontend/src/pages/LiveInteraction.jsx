import React, {
  useState,
  useRef,
  useEffect,
  useMemo
} from "react";

import io from "socket.io-client";

import {
  FaMicrophone,
  FaStop,
  FaRobot,
  FaPaperPlane,
  FaHeartbeat,
  FaExclamationTriangle,
  FaTrash,
  FaVolumeUp,
  FaWifi,
  FaClock,
  FaBrain,
  FaSpinner,
  FaVideo,
  FaPhoneSlash,
  FaDownload,
  FaUserInjured,
  FaNotesMedical,
  FaCheckCircle,
  FaBatteryFull,
  FaSignal,
  FaBell,
  FaHospital,
  FaGlobe,
  FaShieldAlt
} from "react-icons/fa";

import "../styles/live.css";

const socket = io(
  "http://127.0.0.1:8000",
  {
    transports: ["websocket"]
  }
);

export default function LiveInteraction() {

  /* =========================================
      STORAGE
  ========================================= */

  const CHAT_STORAGE_KEY =
    "ai-healthcare-chat-v5";

  /* =========================================
      DEFAULT CHAT
  ========================================= */

  const defaultChat = [

    {
      id: 1,

      from: "AI",

      type: "normal",

      text:
        "👋 Welcome to AI Healthcare Monitoring System.",

      time:
        new Date().toLocaleTimeString()
    }
  ];

  /* =========================================
      STATES
  ========================================= */

  const [chat, setChat] =
    useState(() => {

      try {

        const saved =
          localStorage.getItem(
            CHAT_STORAGE_KEY
          );

        return saved
          ? JSON.parse(saved)
          : defaultChat;

      } catch {

        return defaultChat;
      }
    });

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [listening, setListening] =
    useState(false);

  const [videoCall, setVideoCall] =
    useState(false);

  const [time, setTime] =
    useState("");

  const [network, setNetwork] =
    useState(
      navigator.onLine
    );

  const [aiThinking, setAiThinking] =
    useState("");

  const [patientStatus, setPatientStatus] =
    useState("Stable");

  const [healthScore, setHealthScore] =
    useState(89);

  const [heartRate, setHeartRate] =
    useState(82);

  const [oxygen, setOxygen] =
    useState(98);

  const [bloodPressure, setBloodPressure] =
    useState("120/80");

  const [temperature, setTemperature] =
    useState(98.4);

  const [steps, setSteps] =
    useState(5400);

  const [voiceEnabled] =
    useState(true);

  const recognitionRef =
    useRef(null);

  const chatEndRef =
    useRef(null);

  const localVideoRef =
    useRef(null);

  const remoteVideoRef =
    useRef(null);

  const peerConnection =
    useRef(null);

  /* =========================================
      LIVE CLOCK
  ========================================= */

  useEffect(() => {

    const interval =
      setInterval(() => {

        setTime(
          new Date().toLocaleTimeString()
        );

      }, 1000);

    return () =>
      clearInterval(interval);

  }, []);

  /* =========================================
      NETWORK STATUS
  ========================================= */

  useEffect(() => {

    const online =
      () => setNetwork(true);

    const offline =
      () => setNetwork(false);

    window.addEventListener(
      "online",
      online
    );

    window.addEventListener(
      "offline",
      offline
    );

    return () => {

      window.removeEventListener(
        "online",
        online
      );

      window.removeEventListener(
        "offline",
        offline
      );
    };

  }, []);

  /* =========================================
      LIVE HEALTH DATA
  ========================================= */

  useEffect(() => {

    const interval =
      setInterval(() => {

        setHeartRate(
          Math.floor(
            75 + Math.random() * 15
          )
        );

        setOxygen(
          Math.floor(
            95 + Math.random() * 5
          )
        );

        setTemperature(

          (
            97 +
            Math.random() * 3
          ).toFixed(1)
        );

        setSteps(
          (prev) =>
            prev +
            Math.floor(
              Math.random() * 20
            )
        );

      }, 4000);

    return () =>
      clearInterval(interval);

  }, []);

  /* =========================================
      SAVE CHAT
  ========================================= */

  useEffect(() => {

    localStorage.setItem(

      CHAT_STORAGE_KEY,

      JSON.stringify(chat)

    );

  }, [chat]);

  /* =========================================
      AUTO SCROLL
  ========================================= */

  useEffect(() => {

    chatEndRef.current
      ?.scrollIntoView({

        behavior: "smooth"
      });

  }, [chat]);

  /* =========================================
      SOCKET EVENTS
  ========================================= */

  useEffect(() => {

    socket.on(
      "ai_reply",
      (data) => {

        const aiMsg = {

          id: Date.now(),

          from: "AI",

          type: "normal",

          text: data.message,

          time:
            new Date().toLocaleTimeString()
        };

        setChat((prev) => [

          ...prev,

          aiMsg
        ]);

        speakText(
          data.message
        );

        setLoading(false);
      }
    );

    return () => {

      socket.off("ai_reply");
    };

  }, []);

  /* =========================================
      SPEAK TEXT
  ========================================= */

  const speakText = (text) => {

    if (!voiceEnabled)
      return;

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        text
      );

    const isTelugu =
      /[\u0C00-\u0C7F]/.test(
        text
      );

    speech.lang =
      isTelugu
        ? "te-IN"
        : "en-US";

    speech.rate = 1;

    const voices =
      window.speechSynthesis.getVoices();

    const matchedVoice =
      voices.find(

        (v) =>
          v.lang ===
          speech.lang
      );

    if (matchedVoice) {

      speech.voice =
        matchedVoice;
    }

    window.speechSynthesis.speak(
      speech
    );
  };

  /* =========================================
      EMERGENCY DETECTION
  ========================================= */

  const detectEmergency =
    (msg) => {

      const text =
        msg.toLowerCase();

      const keywords = [

        "heart attack",

        "stroke",

        "blood",

        "collapsed",

        "emergency",

        "help",

        "critical"
      ];

      return keywords.some(
        (k) =>
          text.includes(k)
      );
    };

  /* =========================================
      AI FALLBACK
  ========================================= */

  const generateReply =
    (message) => {

      const text =
        message.toLowerCase();

      if (
        text.includes("fever")
      ) {

        return "🌡️ Fever symptoms detected. Stay hydrated and monitor body temperature.";
      }

      if (
        text.includes("headache")
      ) {

        return "🧠 Headaches may indicate dehydration or stress.";
      }

      if (
        text.includes("heart")
      ) {

        return "❤️ Cardiac symptoms detected. ECG monitoring advised.";
      }

      if (
        text.includes("bp")
      ) {

        return "🩺 Blood pressure monitoring recommended.";
      }

      return "🤖 AI analysis complete. Health parameters stable.";
    };

  /* =========================================
      SPEECH TO TEXT
  ========================================= */

  const startListening =
    () => {

      const SpeechRecognition =

        window.SpeechRecognition ||

        window.webkitSpeechRecognition;

      if (!SpeechRecognition) {

        alert(
          "Speech Recognition not supported"
        );

        return;
      }

      const recognition =
        new SpeechRecognition();

      recognition.lang =
        "te-IN";

      recognition.start();

      setListening(true);

      recognition.onresult =
        (event) => {

          const transcript =

            event.results[0][0]
              .transcript;

          setInput(transcript);

          sendMessage(
            transcript
          );
        };

      recognition.onend =
        () => {

          setListening(false);
        };

      recognitionRef.current =
        recognition;
    };

  const stopListening =
    () => {

      recognitionRef.current?.stop();

      setListening(false);
    };

  /* =========================================
      SEND MESSAGE
  ========================================= */

  const sendMessage =
    async (
      voiceText = null
    ) => {

      const message =
        voiceText || input;

      if (
        !message.trim()
      ) return;

      const userMsg = {

        id: Date.now(),

        from: "USER",

        type: "normal",

        text: message,

        time:
          new Date().toLocaleTimeString()
      };

      setChat((prev) => [

        ...prev,

        userMsg
      ]);

      setInput("");

      if (
        detectEmergency(
          message
        )
      ) {

        setPatientStatus(
          "Critical"
        );

        const emergencyText =

          "🚨 Emergency detected. Medical support alerted.";

        const emergencyMsg = {

          id:
            Date.now() + 1,

          from: "AI",

          type: "critical",

          text:
            emergencyText,

          time:
            new Date().toLocaleTimeString()
        };

        setChat((prev) => [

          ...prev,

          emergencyMsg
        ]);

        speakText(
          emergencyText
        );

        return;
      }

      setLoading(true);

      setAiThinking(
        "AI analyzing patient vitals..."
      );

      socket.emit(
        "patient_message",
        {
          message
        }
      );

      try {

        const res =
          await fetch(

            "http://127.0.0.1:8000/ask-ai",

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                message
              })
            }
          );

        const data =
          await res.json();

        const aiText =
          data.reply ||
          generateReply(
            message
          );

        const aiMsg = {

          id:
            Date.now() + 2,

          from: "AI",

          type: "normal",

          text: aiText,

          time:
            new Date().toLocaleTimeString()
        };

        setChat((prev) => [

          ...prev,

          aiMsg
        ]);

        speakText(aiText);

      } catch {

        const aiText =
          generateReply(
            message
          );

        setChat((prev) => [

          ...prev,

          {

            id:
              Date.now(),

            from: "AI",

            type: "normal",

            text:
              aiText,

            time:
              new Date().toLocaleTimeString()
          }
        ]);

        speakText(aiText);
      }

      setLoading(false);
    };

  /* =========================================
      VIDEO CALL
  ========================================= */

  const startVideoCall =
    async () => {

      setVideoCall(true);

      const stream =
        await navigator
          .mediaDevices
          .getUserMedia({

            video: true,

            audio: true
          });

      localVideoRef.current.srcObject =
        stream;

      const pc =
        new RTCPeerConnection();

      stream
        .getTracks()
        .forEach((track) => {

          pc.addTrack(
            track,
            stream
          );
        });

      peerConnection.current =
        pc;
    };

  const endVideoCall =
    () => {

      setVideoCall(false);

      peerConnection.current?.close();

      if (
        localVideoRef.current
          ?.srcObject
      ) {

        localVideoRef.current
          .srcObject
          .getTracks()
          .forEach((track) =>
            track.stop()
          );
      }
    };

  /* =========================================
      DOWNLOAD CHAT
  ========================================= */

  const downloadChat =
    () => {

      const content =
        chat.map(

          (c) =>
            `${c.from}: ${c.text}`

        ).join("\n\n");

      const blob =
        new Blob([content], {

          type: "text/plain"
        });

      const url =
        URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;

      a.download =
        "ai-healthcare-chat.txt";

      a.click();
    };

  /* =========================================
      CLEAR CHAT
  ========================================= */

  const clearChat =
    () => {

      localStorage.removeItem(
        CHAT_STORAGE_KEY
      );

      setChat(defaultChat);
    };

  /* =========================================
      ALERTS
  ========================================= */

  const criticalAlerts =
    useMemo(() => {

      return chat.filter(
        (c) =>
          c.type ===
          "critical"
      ).length;

    }, [chat]);

  /* =========================================
      UI
  ========================================= */

  return (

    <div className="live-modern">

      {/* HEADER */}

      <div className="live-header-modern">

        <div className="left">

          <FaRobot className="icon" />

          <div>

            <h2>
              AI Healthcare Assistant
            </h2>

            <p>
              Real-time Monitoring System
            </p>

          </div>

        </div>

        <div className="header-right">

          <div className="live-badge">

            <FaWifi />

            {
              network
                ? "ONLINE"
                : "OFFLINE"
            }

          </div>

          <div className="time-badge">

            <FaClock />

            {time}

          </div>

        </div>

      </div>

      {/* ANALYTICS */}

      <div className="analytics-modern">

        <div className="card">

          <FaHeartbeat />

          <h3>
            Heart Rate
          </h3>

          <p>
            {heartRate} BPM
          </p>

        </div>

        <div className="card">

          <FaNotesMedical />

          <h3>
            Oxygen
          </h3>

          <p>
            {oxygen}%
          </p>

        </div>

        <div className="card">

          <FaBrain />

          <h3>
            AI Score
          </h3>

          <p>
            {healthScore}%
          </p>

        </div>

        <div className="card danger">

          <FaExclamationTriangle />

          <h3>
            Alerts
          </h3>

          <p>
            {criticalAlerts}
          </p>

        </div>

      </div>

      {/* STATUS */}

      <div className="status-panel">

        <div className="status-box">

          <FaUserInjured />

          Patient:
          {" "}
          {patientStatus}

        </div>

        <div className="status-box">

          <FaBatteryFull />

          Battery:
          {" "}
          98%

        </div>

        <div className="status-box">

          <FaSignal />

          Signal:
          {" "}
          Strong

        </div>

        <div className="status-box">

          <FaShieldAlt />

          Secured

        </div>

      </div>

      {/* VIDEO */}

      {

        videoCall && (

          <div className="video-container">

            <video
              ref={localVideoRef}
              autoPlay
              muted
              className="video-box"
            />

            <video
              ref={remoteVideoRef}
              autoPlay
              className="video-box"
            />

          </div>
        )
      }

      {/* CHAT */}

      <div className="chat-modern">

        {

          chat.map((c) => (

            <div
              key={c.id}
              className={`bubble ${c.from} ${c.type}`}
            >

              <div className="bubble-top">

                <strong>

                  {
                    c.from === "AI"
                      ? "🤖 AI"
                      : "🧑 USER"
                  }

                </strong>

                <span>
                  {c.time}
                </span>

              </div>

              <p>
                {c.text}
              </p>

            </div>
          ))
        }

        {

          loading && (

            <div className="bubble AI typing">

              <FaSpinner className="spin" />

              {aiThinking}

            </div>
          )
        }

        <div ref={chatEndRef} />

      </div>

      {/* INPUT */}

      <div className="input-modern">

        <input
          value={input}
          placeholder="Ask healthcare AI..."
          onChange={(e) =>
            setInput(
              e.target.value
            )
          }
          onKeyDown={(e) => {

            if (
              e.key === "Enter"
            ) {

              sendMessage();
            }
          }}
        />

        <button
          className={`mic ${listening ? "active" : ""}`}
          onClick={
            listening
              ? stopListening
              : startListening
          }
        >

          {

            listening
              ? <FaStop />
              : <FaMicrophone />
          }

        </button>

        <button
          className="send"
          onClick={() =>
            sendMessage()
          }
        >

          <FaPaperPlane />

        </button>

        <button
          className="video-btn"
          onClick={
            videoCall
              ? endVideoCall
              : startVideoCall
          }
        >

          {

            videoCall
              ? <FaPhoneSlash />
              : <FaVideo />
          }

        </button>

        <button
          className="download-btn"
          onClick={
            downloadChat
          }
        >

          <FaDownload />

        </button>

        <button
          className="clear-btn"
          onClick={
            clearChat
          }
        >

          <FaTrash />

        </button>

      </div>

    </div>
  );
}

