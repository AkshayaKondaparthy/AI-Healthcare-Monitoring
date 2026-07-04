import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import {
  FaUsers,
  FaPhoneAlt,
  FaExclamationTriangle,
  FaCapsules
} from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import "../styles/dashboard.css";

export default function Dashboard() {

  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);
  const [activity, setActivity] = useState(
    [40, 30, 55, 48, 42, 60, 34, 50, 58, 45, 66, 57, 59, 50]
  );
  const [notifications, setNotifications] = useState([]);

  const API = "http://127.0.0.1:8000/patients";

  /* ================= FETCH PATIENTS ================= */
  const fetchPatients = async () => {
    try {
      const res = await axios.get(API);

      // FIX: handle both array or {data: []}
      const data = res.data?.data || res.data || [];

      setPatients(data);
    } catch (err) {
      console.log("API error:", err);

      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: "❌ Backend connection failed"
        }
      ]);
    }
  };

  /* ================= LIVE SYNC ================= */
  useEffect(() => {
    fetchPatients();

    const interval = setInterval(() => {
      fetchPatients();

      setActivity((prev) => [
        ...prev.slice(1),
        Math.floor(Math.random() * 40 + 30)
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* ================= AI RISK CALC ================= */
  const getRiskLevel = (patient) => {

    if (!patient) return 0;

    let risk = 0;

    const score = patient.score || 0;
    const diagnosis = (patient.diagnosis || "").toLowerCase();

    if (score < 40) risk += 50;
    else if (score < 60) risk += 30;
    else risk += 10;

    if (diagnosis.includes("heart")) risk += 25;
    if (diagnosis.includes("diabetes")) risk += 20;
    if (diagnosis.includes("bp") || diagnosis.includes("blood")) risk += 15;

    return Math.min(100, risk);
  };

  /* ================= FILTER ================= */
  const filteredPatients = useMemo(() => {
    return patients.filter((p) =>
      (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.id || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.diagnosis || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [patients, search]);

  /* ================= ALERTS ================= */
  const alerts = useMemo(() => {
    return filteredPatients.filter((p) => {
      return (p.score < 60) || (getRiskLevel(p) > 70);
    });
  }, [filteredPatients]);

  /* ================= STATS ================= */
  const stats = [
    {
      title: "Total Patients",
      value: patients.length,
      change: "Live from backend",
      color: "cyan",
      icon: <FaUsers />
    },
    {
      title: "Calls Today",
      value: 34,
      change: "28 done · 6 pending",
      color: "green",
      icon: <FaPhoneAlt />
    },
    {
      title: "Open Alerts",
      value: alerts.length,
      change: "AI detected",
      color: "red",
      icon: <FaExclamationTriangle />
    },
    {
      title: "Avg Health Score",
      value: patients.length
        ? (
            patients.reduce((acc, p) => acc + (p.score || 0), 0) /
            patients.length
          ).toFixed(1)
        : 0,
      change: "Live AI analysis",
      color: "yellow",
      icon: <FaCapsules />
    }
  ];

  /* ================= CHART ================= */
  const chartData = activity.map((value, index) => ({
    name: `T${index}`,
    score: value
  }));

  return (
    <div className="dashboard">

      {/* ================= NOTIFICATIONS ================= */}
      <div className="notification-container">
        {notifications.map((n) => (
          <div key={n.id} className="notification">
            {n.message}
          </div>
        ))}
      </div>

      {/* ================= STATS ================= */}
      <div className="statsGrid">
        {stats.map((item, index) => (
          <div key={index} className={`card statCard ${item.color}`}>
            <div className="statTop">
              <div>
                <p>{item.title}</p>
                <h2>{item.value}</h2>
                <span>{item.change}</span>
              </div>
              <div className="statIcon">{item.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MIDDLE ================= */}
      <div className="middleGrid">

        {/* CHART */}
        <div className="card largeCard">
          <div className="cardHeader">
            <h3>Live Health Activity</h3>
            <div className="greenDot" />
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[20, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#00C49F"
                strokeWidth={3}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ALERTS */}
        <div className="card alertsCard">
          <div className="cardHeader">
            <h3>Active Alerts</h3>
            <span>{alerts.length}</span>
          </div>

          {alerts.map((alert) => (
            <div key={alert.id} className="alertItem">
              <div className="alertDot" />
              <div>
                <h4>{alert.name}</h4>
                <p>
                  {alert.diagnosis} • Score: {alert.score}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div className="card tableCard">
        <div className="cardHeader">
          <h3>Live Patients</h3>
          <span>{filteredPatients.length} Patients</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Diagnosis</th>
              <th>Score</th>
              <th>AI Risk</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.map((p) => {
              const risk = getRiskLevel(p);

              return (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.diagnosis}</td>
                  <td>{p.score}</td>

                  <td>
                    <span
                      className={`statusBadge ${
                        risk > 70
                          ? "danger"
                          : risk > 40
                          ? "warning"
                          : "completed"
                      }`}
                    >
                      {risk}%
                    </span>
                  </td>

                  <td>
                    <span
                      className={`statusBadge ${
                        p.score > 60 ? "completed" : "danger"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

    </div>
  );
}
