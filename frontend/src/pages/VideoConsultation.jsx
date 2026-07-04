import React, {
  useEffect,
  useRef,
  useState
} from "react";

import io from "socket.io-client";

import {
  FaVideo,
  FaMicrophone,
  FaDesktop,
  FaPhoneSlash,
  FaComments,
  FaPaperPlane,
  FaCameraRotate,
  FaRecordVinyl
} from "react-icons/fa";

import "../styles/videoConsultation.css";

const socket = io(
  "http://127.0.0.1:8000",
  {
    transports: ["websocket"]
  }
);

const servers = {
  iceServers: [
    {
      urls:
        "stun:stun.l.google.com:19302"
    }
  ]
};

export default function VideoConsultation() {

  const roomId = "doctor-room";

  const localVideo =
    useRef(null);

  const remoteVideo =
    useRef(null);

  const peerConnection =
    useRef(null);

  const localStream =
    useRef(null);

  const mediaRecorder =
    useRef(null);

  const recordedChunks =
    useRef([]);

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [micOn, setMicOn] =
    useState(true);

  const [cameraOn, setCameraOn] =
    useState(true);

  const [recording, setRecording] =
    useState(false);

  // =====================================================
  // START
  // =====================================================

  useEffect(() => {

    init();

    socket.emit(
      "join_room",
      {
        roomId
      }
    );

    socket.on(
      "user_joined",
      async () => {

        await createOffer();
      }
    );

    socket.on(
      "offer",
      async (data) => {

        await createAnswer(
          data.offer
        );
      }
    );

    socket.on(
      "answer",
      async (data) => {

        await peerConnection.current
          .setRemoteDescription(
            new RTCSessionDescription(
              data.answer
            )
          );
      }
    );

    socket.on(
      "ice_candidate",
      async (data) => {

        if (data.candidate) {

          await peerConnection.current
            .addIceCandidate(
              new RTCIceCandidate(
                data.candidate
              )
            );
        }
      }
    );

    socket.on(
      "call_chat",
      (data) => {

        setMessages((prev) => [

          ...prev,

          data
        ]);
      }
    );

  }, []);

  // =====================================================
  // INIT MEDIA
  // =====================================================

  const init = async () => {

    const stream =
      await navigator.mediaDevices
        .getUserMedia({

          video: true,
          audio: true
        });

    localStream.current =
      stream;

    localVideo.current.srcObject =
      stream;

    peerConnection.current =
      new RTCPeerConnection(
        servers
      );

    stream.getTracks().forEach(
      (track) => {

        peerConnection.current
          .addTrack(
            track,
            stream
          );
      }
    );

    peerConnection.current
      .ontrack = (event) => {

        remoteVideo.current.srcObject =
          event.streams[0];
      };

    peerConnection.current
      .onicecandidate =
      (event) => {

        if (
          event.candidate
        ) {

          socket.emit(
            "ice_candidate",
            {

              roomId,

              candidate:
                event.candidate
            }
          );
        }
      };
  };

  // =====================================================
  // OFFER
  // =====================================================

  const createOffer =
    async () => {

      const offer =
        await peerConnection.current
          .createOffer();

      await peerConnection.current
        .setLocalDescription(
          offer
        );

      socket.emit(
        "offer",
        {
          roomId,
          offer
        }
      );
    };

  // =====================================================
  // ANSWER
  // =====================================================

  const createAnswer =
    async (offer) => {

      await peerConnection.current
        .setRemoteDescription(
          new RTCSessionDescription(
            offer
          )
        );

      const answer =
        await peerConnection.current
          .createAnswer();

      await peerConnection.current
        .setLocalDescription(
          answer
        );

      socket.emit(
        "answer",
        {
          roomId,
          answer
        }
      );
    };

  // =====================================================
  // SCREEN SHARE
  // =====================================================

  const shareScreen =
    async () => {

      const screenStream =
        await navigator
          .mediaDevices
          .getDisplayMedia({

            video: true
          });

      const screenTrack =
        screenStream
          .getVideoTracks()[0];

      const sender =
        peerConnection.current
          .getSenders()
          .find(

            (s) =>
              s.track.kind ===
              "video"
          );

      sender.replaceTrack(
        screenTrack
      );

      socket.emit(
        "screen_share_started",
        {
          roomId
        }
      );
    };

  // =====================================================
  // TOGGLE MIC
  // =====================================================

  const toggleMic = () => {

    localStream.current
      .getAudioTracks()[0]
      .enabled = !micOn;

    setMicOn(!micOn);
  };

  // =====================================================
  // TOGGLE CAMERA
  // =====================================================

  const toggleCamera =
    () => {

      localStream.current
        .getVideoTracks()[0]
        .enabled =
        !cameraOn;

      setCameraOn(
        !cameraOn
      );
    };

  // =====================================================
  // RECORD
  // =====================================================

  const startRecording =
    () => {

      recordedChunks.current =
        [];

      mediaRecorder.current =
        new MediaRecorder(
          localStream.current
        );

      mediaRecorder.current
        .ondataavailable =
        (event) => {

          if (
            event.data.size > 0
          ) {

            recordedChunks.current
              .push(event.data);
          }
        };

      mediaRecorder.current
        .onstop = () => {

          const blob =
            new Blob(
              recordedChunks.current,
              {
                type:
                  "video/webm"
              }
            );

          const url =
            URL.createObjectURL(
              blob
            );

          const a =
            document.createElement(
              "a"
            );

          a.href = url;

          a.download =
            "consultation.webm";

          a.click();
        };

      mediaRecorder.current.start();

      setRecording(true);

      socket.emit(
        "recording_started",
        {
          roomId
        }
      );
    };

  const stopRecording =
    () => {

      mediaRecorder.current.stop();

      setRecording(false);

      socket.emit(
        "recording_stopped",
        {
          roomId
        }
      );
    };

  // =====================================================
  // CHAT
  // =====================================================

  const sendMessage =
    () => {

      if (!message.trim())
        return;

      socket.emit(
        "call_chat",
        {

          roomId,

          sender: "Doctor",

          message
        }
      );

      setMessage("");
    };

  // =====================================================
  // END CALL
  // =====================================================

  const endCall = () => {

    peerConnection.current.close();

    socket.emit(
      "end_call",
      {
        roomId
      }
    );
  };

  return (

    <div className="consultation-page">

      <div className="video-section">

        <video
          ref={localVideo}
          autoPlay
          muted
          className="video-card"
        />

        <video
          ref={remoteVideo}
          autoPlay
          className="video-card"
        />

      </div>

      <div className="controls">

        <button
          onClick={toggleMic}
        >
          <FaMicrophone />
        </button>

        <button
          onClick={
            toggleCamera
          }
        >
          <FaVideo />
        </button>

        <button
          onClick={
            shareScreen
          }
        >
          <FaDesktop />
        </button>

        <button
          onClick={
            recording
              ? stopRecording
              : startRecording
          }
        >
          <FaRecordVinyl />
        </button>

        <button
          className="end-btn"
          onClick={endCall}
        >
          <FaPhoneSlash />
        </button>

      </div>

      <div className="chat-panel">

        <div className="chat-header">

          <FaComments />

          Consultation Chat

        </div>

        <div className="messages">

          {

            messages.map(
              (msg, i) => (

                <div
                  key={i}
                  className="msg"
                >

                  <strong>
                    {msg.sender}
                  </strong>

                  <p>
                    {msg.message}
                  </p>

                </div>
              )
            )
          }

        </div>

        <div className="chat-input">

          <input
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            placeholder="Message..."
          />

          <button
            onClick={
              sendMessage
            }
          >
            <FaPaperPlane />
          </button>

        </div>

      </div>

    </div>
  );
}