import React, {
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import {
  motion,
  AnimatePresence
} from "framer-motion";

import {
  FaRobot,
  FaMicrophone,
  FaBrain,
  FaCheckCircle,
  FaHeartbeat,
  FaSpinner
} from "react-icons/fa";

import "../styles/streamingText.css";

export default function StreamingText({

  text = "",

  speed = 22,

  speaking = false,

  aiMode = true,

  showCursor = true,

  showWave = true,

  autoScroll = false,

  soundEffect = false,

  highlightKeywords = true,

  onComplete = () => {}
}) {

  /* =====================================================
      STATES
  ===================================================== */

  const [displayed, setDisplayed] =
    useState("");

  const [completed, setCompleted] =
    useState(false);

  const [isTyping, setIsTyping] =
    useState(false);

  const [currentWord, setCurrentWord] =
    useState("");

  const containerRef =
    useRef(null);

  /* =====================================================
      KEYWORDS
  ===================================================== */

  const keywords =
    useMemo(() => [

      "critical",
      "stable",
      "emergency",
      "heart",
      "oxygen",
      "fever",
      "warning",
      "alert",
      "healthy",
      "monitoring",
      "diagnosis",
      "normal",
      "blood",
      "pulse",
      "ecg"
    ], []);

  /* =====================================================
      TYPEWRITER EFFECT
  ===================================================== */

  useEffect(() => {

    if (!text) return;

    let index = 0;

    setDisplayed("");

    setCompleted(false);

    setIsTyping(true);

    const interval =
      setInterval(() => {

        const nextChar =
          text.charAt(index);

        setDisplayed(
          (prev) =>
            prev + nextChar
        );

        const words =
          text
            .substring(0, index + 1)
            .split(" ");

        setCurrentWord(
          words[
            words.length - 1
          ]
        );

        index++;

        if (index >= text.length) {

          clearInterval(interval);

          setCompleted(true);

          setIsTyping(false);

          onComplete();
        }

      }, speed);

    return () =>
      clearInterval(interval);

  }, [text, speed, onComplete]);

  /* =====================================================
      AUTO SCROLL
  ===================================================== */

  useEffect(() => {

    if (
      autoScroll &&
      containerRef.current
    ) {

      containerRef.current.scrollTop =
        containerRef.current
          .scrollHeight;
    }

  }, [displayed, autoScroll]);

  /* =====================================================
      HIGHLIGHT TEXT
  ===================================================== */

  const renderText = () => {

    if (!highlightKeywords) {

      return displayed;
    }

    const parts =
      displayed.split(" ");

    return parts.map(
      (word, index) => {

        const cleanWord =
          word
            .toLowerCase()
            .replace(/[^\w]/g, "");

        const isKeyword =
          keywords.includes(
            cleanWord
          );

        return (

          <span
            key={index}
            className={
              isKeyword
                ? "highlight-word"
                : ""
            }
          >

            {word}{" "}

          </span>
        );
      }
    );
  };

  /* =====================================================
      UI
  ===================================================== */

  return (

    <motion.div

      ref={containerRef}

      className={`streaming-container ${
        speaking
          ? "speaking-mode"
          : ""
      }`}

      initial={{
        opacity: 0,
        y: 20
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.4
      }}
    >

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="streaming-header">

        <div className="streaming-left">

          <motion.div

            className="streaming-ai-avatar"

            animate={{

              scale: speaking
                ? [1, 1.08, 1]
                : 1,

              rotate: speaking
                ? [0, 3, -3, 0]
                : 0
            }}

            transition={{

              repeat: Infinity,

              duration: 1.5
            }}
          >

            <FaRobot />

            <div className="avatar-glow"></div>

          </motion.div>

          <div>

            <h3>
              AI Medical Assistant
            </h3>

            <p>

              {
                completed
                  ? "Response Completed"
                  : "Generating Smart Response..."
              }

            </p>

          </div>

        </div>

        <div className="streaming-status">

          {

            isTyping
              ? (
                <>

                  <FaSpinner className="spin-icon" />

                  Typing

                </>
              )
              : (
                <>

                  <FaCheckCircle />

                  Complete

                </>
              )
          }

        </div>

      </div>

      {/* =====================================
          BODY
      ===================================== */}

      <div className="streaming-body">

        {

          aiMode && (

            <div className="ai-brain">

              <FaBrain />

            </div>
          )
        }

        <div className="streaming-message">

          {renderText()}

          {

            showCursor &&
            isTyping && (

              <motion.span

                className="typing-cursor"

                animate={{
                  opacity: [1, 0]
                }}

                transition={{
                  repeat: Infinity,
                  duration: 0.7
                }}
              >

                |

              </motion.span>
            )
          }

        </div>

      </div>

      {/* =====================================
          FOOTER
      ===================================== */}

      <AnimatePresence>

        {

          showWave &&
          speaking && (

            <motion.div

              className="voice-visualizer"

              initial={{
                opacity: 0
              }}

              animate={{
                opacity: 1
              }}

              exit={{
                opacity: 0
              }}
            >

              <FaMicrophone />

              {

                Array.from({
                  length: 18
                }).map((_, i) => (

                  <motion.span
                    key={i}

                    animate={{
                      height: [
                        10,
                        28,
                        14,
                        34,
                        12
                      ]
                    }}

                    transition={{

                      repeat: Infinity,

                      duration: 1,

                      delay:
                        i * 0.05
                    }}
                  />
                ))
              }

            </motion.div>
          )
        }

      </AnimatePresence>

      {/* =====================================
          ANALYTICS
      ===================================== */}

      <div className="streaming-analytics">

        <div className="analytics-pill">

          <FaHeartbeat />

          AI Monitoring Active

        </div>

        <div className="analytics-pill success">

          <FaCheckCircle />

          Secure Response

        </div>

        <div className="analytics-pill purple">

          <FaBrain />

          Neural AI Enabled

        </div>

      </div>

      {/* =====================================
          CURRENT WORD
      ===================================== */}

      {

        currentWord &&
        isTyping && (

          <div className="live-word">

            <span>
              Live Word:
            </span>

            <strong>
              {currentWord}
            </strong>

          </div>
        )
      }

    </motion.div>
  );
}