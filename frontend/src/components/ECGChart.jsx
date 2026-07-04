import React, {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from "recharts";

import {
  FaHeartbeat,
  FaBolt,
  FaChartLine,
  FaCheckCircle
} from "react-icons/fa";

import "../styles/ecg.css";

export default function ECGChart() {

  /* =====================================================
      STATES
  ===================================================== */

  const [heartRate, setHeartRate] =
    useState(82);

  const [signalQuality] =
    useState("Excellent");

  const [rhythm, setRhythm] =
    useState("Normal Sinus");

  const [liveTime, setLiveTime] =
    useState(
      new Date().toLocaleTimeString()
    );

  /* =====================================================
      ECG DATA
  ===================================================== */

  const data = useMemo(() => {

    const points = [];

    for (let i = 0; i < 120; i++) {

      let value =
        Math.sin(i * 0.22) * 12;

      /* ECG SPIKES */

      if (i % 24 === 0) {

        value += 65;
      }

      if (i % 24 === 1) {

        value -= 18;
      }

      if (i % 24 === 2) {

        value += 10;
      }

      value +=
        Math.random() * 6;

      points.push({

        time: i,

        value
      });
    }

    return points;

  }, [heartRate]);

  /* =====================================================
      LIVE UPDATES
  ===================================================== */

  useEffect(() => {

    const interval =
      setInterval(() => {

        setHeartRate(
          Math.floor(
            72 + Math.random() * 18
          )
        );

        setLiveTime(
          new Date().toLocaleTimeString()
        );

        const rhythms = [

          "Normal Sinus",
          "Stable Rhythm",
          "AI Monitored",
          "Healthy Pattern"
        ];

        setRhythm(

          rhythms[
            Math.floor(
              Math.random() *
              rhythms.length
            )
          ]
        );

      }, 2500);

    return () =>
      clearInterval(interval);

  }, []);

  /* =====================================================
      TOOLTIP
  ===================================================== */

  const CustomTooltip = ({
    active,
    payload
  }) => {

    if (
      active &&
      payload &&
      payload.length
    ) {

      return (

        <div className="ecg-tooltip">

          <p>
            Signal:
            {" "}
            {payload[0].value.toFixed(1)}
          </p>

        </div>
      );
    }

    return null;
  };

  /* =====================================================
      UI
  ===================================================== */

  return (

    <div className="ecg-main-card">

      {/* HEADER */}

      <div className="ecg-topbar">

        <div className="ecg-title-section">

          <div className="pulse-icon">

            <FaHeartbeat />

          </div>

          <div>

            <h2>
              Live ECG Monitor
            </h2>

            <p>
              AI Powered Cardiac Tracking
            </p>

          </div>

        </div>

        <div className="ecg-live-badge">

          <span className="live-dot"></span>

          LIVE

        </div>

      </div>

      {/* STATS */}

      <div className="ecg-stats-grid">

        <div className="ecg-stat-card">

          <FaHeartbeat />

          <div>

            <h4>
              Heart Rate
            </h4>

            <p>
              {heartRate}
              {" "}
              BPM
            </p>

          </div>

        </div>

        <div className="ecg-stat-card">

          <FaBolt />

          <div>

            <h4>
              Signal
            </h4>

            <p>
              {signalQuality}
            </p>

          </div>

        </div>

        <div className="ecg-stat-card">

          <FaChartLine />

          <div>

            <h4>
              Rhythm
            </h4>

            <p>
              {rhythm}
            </p>

          </div>

        </div>

        <div className="ecg-stat-card">

          <FaCheckCircle />

          <div>

            <h4>
              Updated
            </h4>

            <p>
              {liveTime}
            </p>

          </div>

        </div>

      </div>

      {/* ECG GRAPH */}

      <div className="ecg-chart-wrapper">

        <ResponsiveContainer
          width="100%"
          height={240}
        >

          <AreaChart
            data={data}
          >

            <defs>

              <linearGradient
                id="ecgGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#22c55e"
                  stopOpacity={0.9}
                />

                <stop
                  offset="100%"
                  stopColor="#22c55e"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,.06)"
            />

            <XAxis
              hide
              dataKey="time"
            />

            <YAxis hide />

            <Tooltip
              content={
                <CustomTooltip />
              }
            />

            <ReferenceLine
              y={0}
              stroke="rgba(255,255,255,.08)"
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={4}
              fill="url(#ecgGradient)"
              dot={false}
              isAnimationActive={true}
              animationDuration={1200}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

      {/* FOOTER */}

      <div className="ecg-footer">

        <div className="scan-line"></div>

        <p>
          AI ECG Scanner Active •
          Real-time Heart Monitoring
        </p>

      </div>

    </div>
  );
}