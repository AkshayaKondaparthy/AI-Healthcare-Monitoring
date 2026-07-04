import React, {
  useState,
  useEffect
} from "react";

import {
  useNavigate
} from "react-router-dom";

import axios from "axios";

import {
  FaHeartbeat,
  FaLungs,
  FaTint,
  FaBrain,
  FaBell,
  FaUserInjured,
  FaCalendarCheck,
  FaNotesMedical,
  FaRobot,
  FaCheckCircle,
  FaVideo,
  FaArrowRight,
  FaPhoneAlt,
  FaExclamationTriangle,
  FaSyncAlt,
  FaTemperatureHigh,
  FaWalking,
  FaMoon
} from "react-icons/fa";

export default function PatientDashboard() {

  const navigate = useNavigate();

  /* ======================================================
      STATES
  ====================================================== */

  const [loading, setLoading] =
    useState(true);

  const [calling, setCalling] =
    useState(false);

  const [patientData, setPatientData] =
    useState(null);

  const [currentTime, setCurrentTime] =
    useState("");

  /* ======================================================
      LIVE CLOCK
  ====================================================== */

  useEffect(() => {

    const timer = setInterval(() => {

      const now = new Date();

      setCurrentTime(

        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })

      );

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  /* ======================================================
      FETCH DATA
  ====================================================== */

  useEffect(() => {

    fetchPatientData();

  }, []);

  const fetchPatientData = async () => {

    try {

      setLoading(true);

      const dynamicData = {

        patient: {
          name: "John Doe",
          id: "PT-2026",
          doctor: "Dr. Sarah Johnson",
          aiStatus: "Stable"
        },

        vitals: [

          {
            title: "Heart Rate",
            value: "78 BPM",
            icon: <FaHeartbeat />,
            color: "#ef4444",
            change: "+2%"
          },

          {
            title: "Oxygen Level",
            value: "98%",
            icon: <FaLungs />,
            color: "#3b82f6",
            change: "+1%"
          },

          {
            title: "Blood Pressure",
            value: "120/80",
            icon: <FaTint />,
            color: "#22c55e",
            change: "Normal"
          },

          {
            title: "Body Temperature",
            value: "98.6°F",
            icon: <FaTemperatureHigh />,
            color: "#f97316",
            change: "Stable"
          },

          {
            title: "Sleep Quality",
            value: "8.2 hrs",
            icon: <FaMoon />,
            color: "#8b5cf6",
            change: "+10%"
          },

          {
            title: "Daily Activity",
            value: "5.2k Steps",
            icon: <FaWalking />,
            color: "#14b8a6",
            change: "+15%"
          }
        ],

        medications: [

          {
            name: "Paracetamol 500mg",
            timing: "Morning",
            status: "Taken"
          },

          {
            name: "Vitamin D",
            timing: "Evening",
            status: "Pending"
          },

          {
            name: "BP Tablet",
            timing: "Night",
            status: "Pending"
          }
        ],

        alerts: [

          {
            title: "AI Monitoring Active",
            message:
              "No abnormal vitals detected today.",
            type: "success"
          },

          {
            title: "Medication Reminder",
            message:
              "Vitamin D tablet due at 7 PM.",
            type: "warning"
          }
        ],

        appointment: {
          doctor: "Dr. Sarah Johnson",
          date: "24 May 2026",
          time: "10:30 AM"
        }
      };

      setPatientData(dynamicData);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  /* ======================================================
      TWILIO CALL
  ====================================================== */

  /* ======================================================
    TWILIO CALL
====================================================== */

const startCall = async () => {

  try {

    setCalling(true);

    console.log("Calling doctor...");

    const response = await axios.post(

      "http://127.0.0.1:8000/api/twilio/doctor-call",

      {
        phone: "+919392932907", // YOUR VERIFIED NUMBER

        name: patientData?.patient?.name || "John Doe",

        doctor:
          patientData?.patient?.doctor ||
          "Dr. Sarah Johnson"
      },

      {
        headers: {
          "Content-Type":
            "application/json"
        }
      }

    );

    console.log(
      "CALL RESPONSE:",
      response.data
    );

    if (response.data.success) {

      alert(
        `📞 ${patientData.patient.doctor} is calling you now`
      );

    } else {

      alert(
        response.data.error ||
        "Call failed"
      );
    }

  } catch (error) {

    console.log(
      "CALL ERROR:",
      error
    );

    console.log(
      "ERROR RESPONSE:",
      error.response?.data
    );

    alert(

      error.response?.data?.error ||

      "Backend/Twilio call failed"

    );

  } finally {

    setCalling(false);
  }
};

  /* ======================================================
      LOADING SCREEN
  ====================================================== */

  if (loading) {

    return (

      <div style={styles.loaderPage}>

        <div style={styles.loader}></div>

        <h2 style={styles.loadingText}>
          Loading AI Healthcare Dashboard...
        </h2>

      </div>
    );
  }

  return (

    <div style={styles.page}>

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div style={styles.topBar}>

        <div>

          <h1 style={styles.heading}>
            Patient Dashboard
          </h1>

          <p style={styles.subHeading}>
            Welcome back 👋 AI Healthcare
            Monitoring is running live.
          </p>

        </div>

        <div style={styles.rightTop}>

          <div style={styles.clockCard}>

            <FaSyncAlt />

            <span>{currentTime}</span>

          </div>

          <div style={styles.profileBox}>

            <div style={styles.avatar}>
              <FaUserInjured />
            </div>

            <div>

              <h4 style={styles.patientName}>
                {patientData.patient.name}
              </h4>

              <p style={styles.patientId}>
                {patientData.patient.id}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================================
          LIVE SESSION BANNER
      ====================================================== */}

      <div style={styles.liveBanner}>

        <div>

          <h2 style={styles.liveTitle}>
            Live AI Monitoring Session
          </h2>

          <p style={styles.liveText}>
            Connect instantly with your doctor,
            monitor vitals live, and receive
            AI-assisted healthcare support.
          </p>

        </div>

        <div style={styles.liveButtons}>

          <button
            style={styles.liveButton}
            onClick={() =>
              navigate("/patient-live")
            }
          >

            <FaVideo />

            Join Live Session

            <FaArrowRight />

          </button>

          <button
            style={styles.callButton}
            onClick={startCall}
          >

            <FaPhoneAlt />

            {
              calling
                ? "Calling..."
                : "Call Doctor"
            }

          </button>

        </div>

      </div>

      {/* ======================================================
          AI STATUS
      ====================================================== */}

      <div style={styles.statusBanner}>

        <div style={styles.statusLeft}>

          <div style={styles.statusIcon}>
            <FaCheckCircle />
          </div>

          <div>

            <h3 style={styles.statusTitle}>
              AI Health Status
            </h3>

            <p style={styles.statusText}>
              Your health condition looks stable.
              No emergency risk detected.
            </p>

          </div>

        </div>

        <div style={styles.statusBadge}>
          {patientData.patient.aiStatus}
        </div>

      </div>

      {/* ======================================================
          VITALS GRID
      ====================================================== */}

      <div style={styles.grid}>

        {
          patientData.vitals.map(
            (item, index) => (

              <div
                key={index}
                style={styles.card}
              >

                <div
                  style={{
                    ...styles.iconBox,
                    background:
                      `${item.color}15`,
                    color: item.color
                  }}
                >

                  {item.icon}

                </div>

                <div>

                  <p style={styles.cardTitle}>
                    {item.title}
                  </p>

                  <h2 style={styles.cardValue}>
                    {item.value}
                  </h2>

                  <p
                    style={{
                      ...styles.change,
                      color: item.color
                    }}
                  >
                    {item.change}
                  </p>

                </div>

              </div>
            )
          )
        }

      </div>

      {/* ======================================================
          LOWER GRID
      ====================================================== */}

      <div style={styles.bottomGrid}>

        {/* MEDICATIONS */}

        <div style={styles.largeCard}>

          <div style={styles.sectionHeader}>

            <h2 style={styles.sectionTitle}>
              Medications
            </h2>

            <FaNotesMedical color="#22c55e" />

          </div>

          {
            patientData.medications.map(
              (med, index) => (

                <div
                  key={index}
                  style={styles.medicationItem}
                >

                  <div>

                    <h4 style={styles.medName}>
                      {med.name}
                    </h4>

                    <p style={styles.medTime}>
                      {med.timing}
                    </p>

                  </div>

                  <div
                    style={{
                      ...styles.medStatus,

                      background:
                        med.status === "Taken"

                          ? "rgba(34,197,94,0.15)"

                          : "rgba(250,204,21,0.15)",

                      color:
                        med.status === "Taken"

                          ? "#22c55e"

                          : "#facc15"
                    }}
                  >

                    {med.status}

                  </div>

                </div>
              )
            )
          }

        </div>

        {/* APPOINTMENT */}

        <div style={styles.largeCard}>

          <div style={styles.sectionHeader}>

            <h2 style={styles.sectionTitle}>
              Upcoming Appointment
            </h2>

            <FaCalendarCheck color="#3b82f6" />

          </div>

          <div style={styles.appointmentBox}>

            <h3 style={styles.doctorName}>
              {
                patientData.appointment.doctor
              }
            </h3>

            <p style={styles.appointmentTime}>
              {
                patientData.appointment.date
              } • {
                patientData.appointment.time
              }
            </p>

            <div
              style={
                styles.appointmentButtons
              }
            >

              <button
                style={styles.button}
                onClick={() =>
                  navigate("/patient-live")
                }
              >

                Join Consultation

              </button>

              <button
                style={
                  styles.secondaryButton
                }
                onClick={startCall}
              >

                {
                  calling
                    ? "Calling..."
                    : "Call Doctor"
                }

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================================
          ALERTS
      ====================================================== */}

      <div style={styles.alertSection}>

        <div style={styles.sectionHeader}>

          <h2 style={styles.sectionTitle}>
            AI Alerts & Notifications
          </h2>

          <FaBell color="#facc15" />

        </div>

        <div style={styles.alertGrid}>

          {
            patientData.alerts.map(
              (alert, index) => (

                <div
                  key={index}
                  style={styles.alertCard}
                >

                  <div
                    style={{
                      ...styles.alertIcon,

                      background:
                        alert.type ===
                        "success"

                          ? "rgba(34,197,94,0.15)"

                          : "rgba(250,204,21,0.15)",

                      color:
                        alert.type ===
                        "success"

                          ? "#22c55e"

                          : "#facc15"
                    }}
                  >

                    <FaExclamationTriangle />

                  </div>

                  <div>

                    <h3
                      style={
                        styles.alertTitle
                      }
                    >
                      {alert.title}
                    </h3>

                    <p
                      style={
                        styles.alertText
                      }
                    >
                      {alert.message}
                    </p>

                  </div>

                </div>
              )
            )
          }

        </div>

      </div>

      {/* ======================================================
          AI ASSISTANT
      ====================================================== */}

      <div style={styles.aiAssistant}>

        <div style={styles.aiHeader}>

          <div style={styles.aiIcon}>
            <FaRobot />
          </div>

          <div>

            <h2 style={styles.aiTitle}>
              AI Health Assistant
            </h2>

            <p style={styles.aiText}>
              Your health vitals look normal
              today. Continue medications,
              drink enough water, and maintain
              healthy daily activity.
            </p>

          </div>

        </div>

        <button style={styles.alertButton}>

          <FaBell />

          View Alerts

        </button>

      </div>

    </div>
  );
}

/* ======================================================
   STYLES
====================================================== */

const styles = {

  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#020617,#0f172a,#111827)",
    padding: "40px",
    color: "white",
    fontFamily: "Inter, sans-serif"
  },

  loaderPage: {
    minHeight: "100vh",
    background: "#020617",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  loader: {
    width: "60px",
    height: "60px",
    border:
      "5px solid rgba(255,255,255,0.1)",
    borderTop:
      "5px solid #22c55e",
    borderRadius: "50%",
    animation:
      "spin 1s linear infinite"
  },

  loadingText: {
    marginTop: "20px",
    color: "white"
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "35px"
  },

  rightTop: {
    display: "flex",
    gap: "16px",
    alignItems: "center"
  },

  clockCard: {
    background:
      "rgba(255,255,255,0.06)",
    padding: "14px 18px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "700"
  },

  heading: {
    fontSize: "42px",
    fontWeight: "800"
  },

  subHeading: {
    marginTop: "10px",
    color: "#94a3b8"
  },

  profileBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    background:
      "rgba(255,255,255,0.06)",
    padding: "14px 18px",
    borderRadius: "18px"
  },

  avatar: {
    width: "58px",
    height: "58px",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px"
  },

  patientName: {
    fontSize: "18px",
    fontWeight: "700"
  },

  patientId: {
    color: "#94a3b8",
    marginTop: "4px"
  },

  liveBanner: {
    background:
      "linear-gradient(135deg,#2563eb,#1d4ed8)",
    padding: "34px",
    borderRadius: "30px",
    marginBottom: "35px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    boxShadow:
      "0 25px 60px rgba(37,99,235,0.3)"
  },

  liveTitle: {
    fontSize: "30px",
    fontWeight: "800"
  },

  liveText: {
    marginTop: "10px",
    color: "#dbeafe",
    maxWidth: "620px",
    lineHeight: "1.8"
  },

  liveButtons: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap"
  },

  liveButton: {
    padding: "18px 24px",
    borderRadius: "18px",
    border: "none",
    background: "white",
    color: "#2563eb",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  callButton: {
    padding: "18px 24px",
    borderRadius: "18px",
    border: "none",
    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  statusBanner: {
    background:
      "linear-gradient(135deg,#16a34a,#22c55e)",
    padding: "28px",
    borderRadius: "24px",
    marginBottom: "35px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px"
  },

  statusLeft: {
    display: "flex",
    alignItems: "center",
    gap: "18px"
  },

  statusIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "18px",
    background:
      "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  statusTitle: {
    fontSize: "22px",
    fontWeight: "700"
  },

  statusText: {
    marginTop: "6px"
  },

  statusBadge: {
    background: "white",
    color: "#16a34a",
    padding: "12px 22px",
    borderRadius: "999px",
    fontWeight: "700"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "22px",
    marginBottom: "35px"
  },

  card: {
    background:
      "rgba(255,255,255,0.06)",
    borderRadius: "24px",
    padding: "24px",
    display: "flex",
    gap: "18px",
    alignItems: "center",
    border:
      "1px solid rgba(255,255,255,0.08)"
  },

  iconBox: {
    width: "72px",
    height: "72px",
    borderRadius: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px"
  },

  cardTitle: {
    color: "#94a3b8",
    marginBottom: "8px"
  },

  cardValue: {
    fontSize: "30px",
    fontWeight: "800"
  },

  change: {
    marginTop: "8px",
    fontWeight: "700"
  },

  bottomGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(340px,1fr))",
    gap: "24px",
    marginBottom: "35px"
  },

  largeCard: {
    background:
      "rgba(255,255,255,0.06)",
    borderRadius: "28px",
    padding: "28px",
    border:
      "1px solid rgba(255,255,255,0.08)"
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px"
  },

  sectionTitle: {
    fontSize: "22px",
    fontWeight: "700"
  },

  medicationItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 0",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)"
  },

  medName: {
    fontWeight: "700"
  },

  medTime: {
    marginTop: "6px",
    color: "#94a3b8"
  },

  medStatus: {
    padding: "10px 16px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "13px"
  },

  appointmentBox: {
    background:
      "rgba(59,130,246,0.12)",
    padding: "24px",
    borderRadius: "24px"
  },

  doctorName: {
    fontSize: "24px",
    fontWeight: "700"
  },

  appointmentTime: {
    marginTop: "10px",
    color: "#cbd5e1"
  },

  appointmentButtons: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginTop: "25px"
  },

  button: {
    padding: "14px 22px",
    borderRadius: "14px",
    border: "none",
    background:
      "linear-gradient(135deg,#3b82f6,#2563eb)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer"
  },

  secondaryButton: {
    padding: "14px 22px",
    borderRadius: "14px",
    border: "none",
    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer"
  },

  alertSection: {
    marginBottom: "35px"
  },

  alertGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    gap: "20px"
  },

  alertCard: {
    background:
      "rgba(255,255,255,0.06)",
    borderRadius: "24px",
    padding: "24px",
    display: "flex",
    gap: "16px"
  },

  alertIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  alertTitle: {
    fontWeight: "700",
    marginBottom: "8px"
  },

  alertText: {
    color: "#cbd5e1",
    lineHeight: "1.7"
  },

  aiAssistant: {
    background:
      "linear-gradient(135deg,#111827,#1e293b)",
    padding: "32px",
    borderRadius: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px"
  },

  aiHeader: {
    display: "flex",
    gap: "18px"
  },

  aiIcon: {
    width: "72px",
    height: "72px",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg,#a855f7,#7c3aed)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px"
  },

  aiTitle: {
    fontSize: "24px",
    fontWeight: "700"
  },

  aiText: {
    marginTop: "10px",
    color: "#cbd5e1",
    maxWidth: "650px",
    lineHeight: "1.8"
  },

  alertButton: {
    padding: "16px 24px",
    borderRadius: "16px",
    border: "none",
    background:
      "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  }
};