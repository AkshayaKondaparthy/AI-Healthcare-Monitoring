import React from "react";

import {
  motion
} from "framer-motion";

import {
  FaMicrophoneAlt,
  FaVolumeUp,
  FaWaveSquare
} from "react-icons/fa";

import "../styles/wave.css";

export default function VoiceWave({

  active = false,
  size = "medium",
  color = "green",
  showIcon = true,
  showParticles = true,
  intensity = 1

}) {

  const bars =
    size === "large"
      ? 18
      : size === "small"
      ? 8
      : 12;

  return (

    <div
      className={`
        wave-wrapper
        ${active ? "active" : ""}
        ${size}
        ${color}
      `}
    >

      {/* =====================================
          BACKGROUND GLOW
      ===================================== */}

      <div className="wave-glow"></div>

      {/* =====================================
          CENTER ICON
      ===================================== */}

      {

        showIcon && (

          <motion.div
            className="wave-center-icon"
            animate={{
              scale: active
                ? [1, 1.12, 1]
                : 1,

              rotate: active
                ? [0, 5, -5, 0]
                : 0
            }}
            transition={{
              repeat: Infinity,
              duration: 2
            }}
          >

            {
              active
                ? <FaMicrophoneAlt />
                : <FaVolumeUp />
            }

          </motion.div>
        )
      }

      {/* =====================================
          MAIN WAVES
      ===================================== */}

      <div className="wave-container">

        {

          [...Array(bars)].map((_, i) => (

            <motion.span

              key={i}

              className="wave-bar"

              animate={{

                height: active
                  ? [
                      12,
                      25 + Math.random() * 60 * intensity,
                      18
                    ]
                  : 10,

                opacity: active
                  ? [0.4, 1, 0.5]
                  : 0.3,

                scaleY: active
                  ? [1, 1.4, 1]
                  : 1
              }}

              transition={{

                repeat: Infinity,

                duration:
                  0.6 +
                  Math.random() * 0.8,

                delay: i * 0.05,

                ease: "easeInOut"
              }}
            />
          ))
        }

      </div>

      {/* =====================================
          SOUND PARTICLES
      ===================================== */}

      {

        active &&
        showParticles && (

          <div className="wave-particles">

            {

              [...Array(10)].map((_, i) => (

                <motion.div

                  key={i}

                  className="particle"

                  animate={{

                    y: [-10, -120],

                    x: [
                      0,
                      Math.random() * 80 - 40
                    ],

                    opacity: [0, 1, 0],

                    scale: [0.5, 1.2, 0]
                  }}

                  transition={{

                    repeat: Infinity,

                    duration:
                      2 +
                      Math.random(),

                    delay:
                      i * 0.2
                  }}
                />
              ))
            }

          </div>
        )
      }

      {/* =====================================
          STATUS
      ===================================== */}

      <div className="wave-status">

        <FaWaveSquare />

        <span>

          {
            active
              ? "VOICE ACTIVE"
              : "STANDBY MODE"
          }

        </span>

      </div>

    </div>
  );
}