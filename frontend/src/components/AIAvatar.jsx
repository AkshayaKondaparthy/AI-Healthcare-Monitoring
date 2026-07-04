import React, {
  useMemo
} from "react";

import {
  motion
} from "framer-motion";

import {
  FaRobot,
  FaMicrophone,
  FaBrain,
  FaHeartbeat
} from "react-icons/fa";

import "../styles/aiAvatar.css";

export default function AIAvatar({

  speaking = false,

  thinking = false,

  online = true,

  emergency = false,

  aiMood = "Monitoring"

}) {

  /* =========================================
      PARTICLES
  ========================================= */

  const particles = useMemo(() => {

    return Array.from(
      { length: 10 },
      (_, i) => i
    );

  }, []);

  /* =========================================
      STATUS COLOR
  ========================================= */

  const statusClass =
    emergency
      ? "emergency"
      : speaking
      ? "speaking"
      : thinking
      ? "thinking"
      : "idle";

  /* =========================================
      UI
  ========================================= */

  return (

    <div className="ai-avatar-wrapper">

      {/* PARTICLES */}

      <div className="particle-container">

        {

          particles.map((p) => (

            <motion.span
              key={p}
              className="particle"

              animate={{

                y: [-10, -70],

                opacity: [0, 1, 0],

                x: [
                  0,
                  Math.random() * 40 - 20
                ]
              }}

              transition={{

                repeat: Infinity,

                duration:
                  2 +
                  Math.random() * 2,

                delay:
                  Math.random() * 2
              }}
            />
          ))
        }

      </div>

      {/* AI CORE */}

      <motion.div

        className={`ai-avatar ${statusClass}`}

        animate={{

          scale: speaking
            ? [1, 1.08, 1]

            : thinking
            ? [1, 1.04, 1]

            : [1, 1.02, 1],

          rotate: emergency
            ? [0, -2, 2, 0]
            : 0
        }}

        transition={{

          repeat: Infinity,

          duration:
            speaking
              ? 1
              : 2
        }}
      >

        {/* OUTER GLOW */}

        <motion.div
          className="avatar-glow"

          animate={{

            opacity:
              speaking
                ? [0.4, 1, 0.4]
                : [0.2, 0.5, 0.2],

            scale:
              speaking
                ? [1, 1.2, 1]
                : [1, 1.05, 1]
          }}

          transition={{

            repeat: Infinity,

            duration: 2
          }}
        />

        {/* RINGS */}

        <motion.div
          className="ai-ring"

          animate={{

            rotate: 360
          }}

          transition={{

            repeat: Infinity,

            duration: 8,

            ease: "linear"
          }}
        />

        <motion.div
          className="ai-ring second"

          animate={{

            rotate: -360
          }}

          transition={{

            repeat: Infinity,

            duration: 10,

            ease: "linear"
          }}
        />

        <motion.div
          className="ai-ring third"

          animate={{

            rotate: 360
          }}

          transition={{

            repeat: Infinity,

            duration: 14,

            ease: "linear"
          }}
        />

        {/* CORE */}

        <div className="ai-core">

          <FaRobot className="robot-icon" />

        </div>

        {/* LIVE DOT */}

        {

          online && (

            <motion.div

              className="live-dot"

              animate={{

                scale: [1, 1.3, 1],

                opacity: [1, 0.4, 1]
              }}

              transition={{

                repeat: Infinity,

                duration: 1
              }}
            />
          )
        }

      </motion.div>

      {/* AI STATUS */}

      <motion.div

        className="ai-status-box"

        initial={{
          opacity: 0,
          y: 10
        }}

        animate={{
          opacity: 1,
          y: 0
        }}
      >

        <div className="status-header">

          <FaBrain />

          <span>
            AI Neural Engine
          </span>

        </div>

        <h3>
          {aiMood}
        </h3>

        <div className="status-tags">

          <div className="tag">

            <FaHeartbeat />

            LIVE
          </div>

          <div className="tag">

            <FaMicrophone />

            {
              speaking
                ? "SPEAKING"
                : "READY"
            }

          </div>

        </div>

      </motion.div>

    </div>
  );
}