import React, { useEffect, useState } from "react";

import axios from "axios";

import {
  FaHeartbeat,
  FaTint,
  FaUserMd,
  FaShieldAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaNotesMedical,
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaWeight,
  FaRulerVertical,
  FaProcedures,
  FaStethoscope,
  FaBrain
} from "react-icons/fa";

export default function PatientProfile() {

  /* ======================================================
      STATE
  ====================================================== */

  const [patient, setPatient] = useState(null);

  const [loading, setLoading] =
    useState(true);

  /* ======================================================
      FETCH PATIENT
  ====================================================== */

  useEffect(() => {

    fetchPatient();

  }, []);

  const fetchPatient = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/patients"
      );

      const data = response.data[0];

      const patientData = {

        personal: {

          name: data.name,

          role:
            "Post-Discharge Recovery Patient",

          image:
            "https://i.pravatar.cc/300?img=12",

          phone: data.phone,

          email:
            data.email ||
            "patient@gmail.com",

          location:
            "Hyderabad, India",

          lastVisit:
            "20 May 2026",

          joined:
            "January 2026"
        },

        health: {

          heartRate: "78 BPM",

          bloodGroup: "O+",

          recoveryStatus:
            data.status,

          doctor: "Dr. Smith",

          oxygen: "98%",

          bloodPressure:
            "120 / 80",

          temperature:
            "98.6°F"
        },

        medical: {

          age: "32 Years",

          height: "175 cm",

          weight: "72 kg",

          diagnosis:
            data.diagnosis,

          condition:
            "Improving",

          treatment:
            "AI Monitored Recovery"
        },

        analytics: {

          recovery:
            `${data.score}%`,

          medications: "12",

          appointments: "8",

          reports: "15"
        }
      };

      setPatient(patientData);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  /* ======================================================
      LOADER
  ====================================================== */

  if (loading) {

    return (

      <div style={styles.loaderPage}>

        <div style={styles.loader}></div>

        <h2 style={styles.loadingText}>
          Loading Patient Profile...
        </h2>

      </div>
    );
  }

  /* ======================================================
      NO DATA
  ====================================================== */

  if (!patient) {

    return (

      <div style={styles.loaderPage}>

        <h2>No Patient Data Found</h2>

      </div>
    );
  }

  /* ======================================================
      UI
  ====================================================== */

  return (

    <div style={styles.page}>

      <div style={styles.blur1}></div>

      <div style={styles.blur2}></div>

      <div style={styles.header}>

        <div>

          <p style={styles.smallText}>
            AI Healthcare Portal
          </p>

          <h1 style={styles.heading}>
            Patient Profile
          </h1>

          <p style={styles.subHeading}>
            Real-time patient health overview
            and medical analytics.
          </p>

        </div>

        <div style={styles.statusBadge}>

          <FaCheckCircle />

          {patient.health.recoveryStatus}

        </div>

      </div>

      <div style={styles.grid}>

        {/* LEFT */}

        <div style={styles.profileCard}>

          <div style={styles.profileTop}>

            <div style={styles.avatarWrapper}>

              <img
                src={patient.personal.image}
                alt="profile"
                style={styles.avatar}
              />

              <div style={styles.onlineDot}></div>

            </div>

            <h2 style={styles.name}>
              {patient.personal.name}
            </h2>

            <p style={styles.role}>
              {patient.personal.role}
            </p>

          </div>

          {/* PROGRESS */}

          <div style={styles.progressCard}>

            <div style={styles.progressTop}>

              <span style={styles.progressLabel}>
                Recovery Progress
              </span>

              <span style={styles.progressPercent}>
                {patient.analytics.recovery}
              </span>

            </div>

            <div style={styles.progressBar}>

              <div
                style={{
                  ...styles.progressFill,
                  width:
                    patient.analytics.recovery
                }}
              ></div>

            </div>

          </div>

          {/* CONTACT */}

          <div style={styles.contactSection}>

            <div style={styles.contactItem}>

              <div style={styles.contactIconGreen}>
                <FaPhoneAlt />
              </div>

              <div>

                <p style={styles.contactLabel}>
                  Phone
                </p>

                <h4 style={styles.contactValue}>
                  {patient.personal.phone}
                </h4>

              </div>

            </div>

            <div style={styles.contactItem}>

              <div style={styles.contactIconBlue}>
                <FaEnvelope />
              </div>

              <div>

                <p style={styles.contactLabel}>
                  Email
                </p>

                <h4 style={styles.contactValue}>
                  {patient.personal.email}
                </h4>

              </div>

            </div>

            <div style={styles.contactItem}>

              <div style={styles.contactIconOrange}>
                <FaMapMarkerAlt />
              </div>

              <div>

                <p style={styles.contactLabel}>
                  Location
                </p>

                <h4 style={styles.contactValue}>
                  {patient.personal.location}
                </h4>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div style={styles.rightSection}>

          {/* STATS */}

          <div style={styles.statsGrid}>

            <div style={styles.statCard}>

              <div style={styles.statIconGreen}>
                <FaHeartbeat />
              </div>

              <div>

                <p style={styles.statTitle}>
                  Heart Rate
                </p>

                <h3 style={styles.statValue}>
                  {
                    patient.health
                      .heartRate
                  }
                </h3>

              </div>

            </div>

            <div style={styles.statCard}>

              <div style={styles.statIconBlue}>
                <FaTint />
              </div>

              <div>

                <p style={styles.statTitle}>
                  Blood Group
                </p>

                <h3 style={styles.statValue}>
                  {
                    patient.health
                      .bloodGroup
                  }
                </h3>

              </div>

            </div>

            <div style={styles.statCard}>

              <div style={styles.statIconPurple}>
                <FaShieldAlt />
              </div>

              <div>

                <p style={styles.statTitle}>
                  Recovery Status
                </p>

                <h3 style={styles.statValue}>
                  {
                    patient.health
                      .recoveryStatus
                  }
                </h3>

              </div>

            </div>

            <div style={styles.statCard}>

              <div style={styles.statIconOrange}>
                <FaUserMd />
              </div>

              <div>

                <p style={styles.statTitle}>
                  Assigned Doctor
                </p>

                <h3 style={styles.statValue}>
                  {
                    patient.health
                      .doctor
                  }
                </h3>

              </div>

            </div>

          </div>

          {/* ANALYTICS */}

          <div style={styles.analyticsGrid}>

            <div style={styles.analyticsCard}>

              <FaNotesMedical
                style={styles.analyticsIcon}
              />

              <h2 style={styles.analyticsNumber}>
                {
                  patient.analytics
                    .reports
                }
              </h2>

              <p style={styles.analyticsText}>
                Medical Reports
              </p>

            </div>

            <div style={styles.analyticsCard}>

              <FaCalendarAlt
                style={styles.analyticsIcon}
              />

              <h2 style={styles.analyticsNumber}>
                {
                  patient.analytics
                    .appointments
                }
              </h2>

              <p style={styles.analyticsText}>
                Appointments
              </p>

            </div>

            <div style={styles.analyticsCard}>

              <FaProcedures
                style={styles.analyticsIcon}
              />

              <h2 style={styles.analyticsNumber}>
                {
                  patient.analytics
                    .medications
                }
              </h2>

              <p style={styles.analyticsText}>
                Medications
              </p>

            </div>

          </div>

          {/* MEDICAL */}

          <div style={styles.medicalCard}>

            <div style={styles.sectionTop}>

              <div style={styles.sectionIcon}>
                <FaNotesMedical />
              </div>

              <div>

                <h2 style={styles.sectionTitle}>
                  Medical Information
                </h2>

              </div>

            </div>

            <div style={styles.medicalGrid}>

              <div style={styles.medicalItem}>

                <FaUser
                  style={styles.medicalItemIcon}
                />

                <p style={styles.label}>
                  Age
                </p>

                <h3 style={styles.value}>
                  {patient.medical.age}
                </h3>

              </div>

              <div style={styles.medicalItem}>

                <FaRulerVertical
                  style={styles.medicalItemIcon}
                />

                <p style={styles.label}>
                  Height
                </p>

                <h3 style={styles.value}>
                  {
                    patient.medical
                      .height
                  }
                </h3>

              </div>

              <div style={styles.medicalItem}>

                <FaWeight
                  style={styles.medicalItemIcon}
                />

                <p style={styles.label}>
                  Weight
                </p>

                <h3 style={styles.value}>
                  {
                    patient.medical
                      .weight
                  }
                </h3>

              </div>

              <div style={styles.medicalItem}>

                <FaStethoscope
                  style={styles.medicalItemIcon}
                />

                <p style={styles.label}>
                  Diagnosis
                </p>

                <h3 style={styles.value}>
                  {
                    patient.medical
                      .diagnosis
                  }
                </h3>

              </div>

              <div style={styles.medicalItem}>

                <FaBrain
                  style={styles.medicalItemIcon}
                />

                <p style={styles.label}>
                  AI Monitoring
                </p>

                <h3 style={styles.value}>
                  Active
                </h3>

              </div>

            </div>

          </div>

        </div>

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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "white"
  },

  loader: {
    width: "60px",
    height: "60px",
    border: "6px solid rgba(255,255,255,0.1)",
    borderTop: "6px solid #22c55e",
    borderRadius: "50%"
  },

  loadingText: {
    marginTop: "20px"
  },

  blur1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(34,197,94,0.15)",
    filter: "blur(120px)",
    top: "-100px",
    left: "-100px"
  },

  blur2: {
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "rgba(59,130,246,0.12)",
    filter: "blur(120px)",
    bottom: "-120px",
    right: "-100px"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "35px"
  },

  smallText: {
    color: "#94a3b8"
  },

  heading: {
    fontSize: "46px",
    fontWeight: "900"
  },

  subHeading: {
    marginTop: "10px",
    color: "#94a3b8"
  },

  statusBadge: {
    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",
    padding: "14px 20px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "380px 1fr",
    gap: "30px"
  },

  profileCard: {
    background: "rgba(15,23,42,0.85)",
    borderRadius: "30px",
    padding: "35px"
  },

  profileTop: {
    textAlign: "center"
  },

  avatarWrapper: {
    position: "relative",
    width: "150px",
    margin: "0 auto 25px"
  },

  avatar: {
    width: "150px",
    height: "150px",
    borderRadius: "50%"
  },

  onlineDot: {
    position: "absolute",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "#22c55e",
    bottom: "10px",
    right: "10px"
  },

  name: {
    fontSize: "34px",
    fontWeight: "800"
  },

  role: {
    color: "#94a3b8"
  },

  progressCard: {
    marginTop: "30px"
  },

  progressTop: {
    display: "flex",
    justifyContent: "space-between"
  },

  progressLabel: {
    color: "#94a3b8"
  },

  progressPercent: {
    color: "#22c55e"
  },

  progressBar: {
    width: "100%",
    height: "10px",
    background: "#1e293b",
    borderRadius: "999px",
    marginTop: "10px"
  },

  progressFill: {
    height: "100%",
    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",
    borderRadius: "999px"
  },

  contactSection: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  },

  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background:
      "rgba(255,255,255,0.04)",
    padding: "16px",
    borderRadius: "18px"
  },

  contactIconGreen: {
    color: "#22c55e"
  },

  contactIconBlue: {
    color: "#3b82f6"
  },

  contactIconOrange: {
    color: "#f97316"
  },

  contactLabel: {
    color: "#94a3b8"
  },

  contactValue: {
    fontWeight: "700"
  },

  rightSection: {
    display: "flex",
    flexDirection: "column",
    gap: "28px"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "22px"
  },

  statCard: {
    background:
      "rgba(15,23,42,0.85)",
    borderRadius: "24px",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    gap: "18px"
  },

  statIconGreen: {
    color: "#22c55e"
  },

  statIconBlue: {
    color: "#3b82f6"
  },

  statIconPurple: {
    color: "#a855f7"
  },

  statIconOrange: {
    color: "#f97316"
  },

  statTitle: {
    color: "#94a3b8"
  },

  statValue: {
    fontSize: "22px",
    fontWeight: "800"
  },

  analyticsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "20px"
  },

  analyticsCard: {
    background:
      "linear-gradient(135deg,#111827,#1e293b)",
    borderRadius: "24px",
    padding: "28px",
    textAlign: "center"
  },

  analyticsIcon: {
    fontSize: "28px",
    color: "#22c55e"
  },

  analyticsNumber: {
    fontSize: "36px",
    fontWeight: "900"
  },

  analyticsText: {
    color: "#94a3b8"
  },

  medicalCard: {
    background:
      "rgba(15,23,42,0.85)",
    borderRadius: "30px",
    padding: "35px"
  },

  sectionTop: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "30px"
  },

  sectionIcon: {
    color: "#22c55e"
  },

  sectionTitle: {
    fontSize: "30px",
    fontWeight: "800"
  },

  medicalGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px"
  },

  medicalItem: {
    background:
      "rgba(255,255,255,0.04)",
    borderRadius: "20px",
    padding: "24px"
  },

  medicalItemIcon: {
    color: "#22c55e"
  },

  label: {
    color: "#94a3b8"
  },

  value: {
    fontSize: "22px",
    fontWeight: "700"
  }
};