import React, { useEffect, useState } from "react";

import {
  FaFileMedical,
  FaHeartbeat,
  FaBrain,
  FaNotesMedical,
  FaEye,
  FaDownload,
  FaCalendarAlt,
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function PatientReports() {

  const navigate = useNavigate();

  /* ======================================================
      STATES
  ====================================================== */

  const [reports, setReports] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedReport, setSelectedReport] =
    useState(null);

  /* ======================================================
      FETCH REPORTS
  ====================================================== */

  useEffect(() => {

    /* ======================================================
        DYNAMIC REPORTS
        Replace with API response
    ====================================================== */

    const reportData = [

      {
        id: 1,

        title: "Blood Test Report",

        icon: (
          <FaFileMedical
            size={22}
            color="#22c55e"
          />
        ),

        status: "Normal",

        date: "21 May 2026",

        doctor: "Dr. Smith",

        description:
          "Complete blood count and biochemical analysis.",

        details:
          "Blood sugar, hemoglobin, and platelet levels are within normal range.",

        type: "Lab Report"
      },

      {
        id: 2,

        title: "Heart Monitoring",

        icon: (
          <FaHeartbeat
            size={22}
            color="#ef4444"
          />
        ),

        status: "Stable",

        date: "19 May 2026",

        doctor: "Dr. Sarah",

        description:
          "Continuous ECG and heart rhythm monitoring.",

        details:
          "Heart rhythm normal with no abnormal spikes detected.",

        type: "Cardiology"
      },

      {
        id: 3,

        title: "AI Risk Analysis",

        icon: (
          <FaBrain
            size={22}
            color="#3b82f6"
          />
        ),

        status: "Low Risk",

        date: "18 May 2026",

        doctor: "AI Engine",

        description:
          "AI generated health prediction and recovery analysis.",

        details:
          "AI predicts low health risk with 98% recovery probability.",

        type: "AI Prediction"
      },

      {
        id: 4,

        title: "Discharge Summary",

        icon: (
          <FaNotesMedical
            size={22}
            color="#f59e0b"
          />
        ),

        status: "Completed",

        date: "15 May 2026",

        doctor: "Dr. Michael",

        description:
          "Doctor discharge instructions and medications.",

        details:
          "Patient advised to continue medication and weekly monitoring.",

        type: "Summary"
      }
    ];

    setReports(reportData);

  }, []);

  /* ======================================================
      FILTER REPORTS
  ====================================================== */

  const filteredReports = reports.filter(
    (report) =>
      report.title
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  /* ======================================================
      DOWNLOAD REPORT
  ====================================================== */

  const downloadReport = (report) => {

    const content = `
${report.title}

Status: ${report.status}

Doctor: ${report.doctor}

Date: ${report.date}

Description:
${report.description}

Details:
${report.details}
`;

    const blob = new Blob(
      [content],
      {
        type: "text/plain"
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      `${report.title}.txt`;

    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (

    <div style={styles.page}>

      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div style={styles.blur1}></div>
      <div style={styles.blur2}></div>

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div style={styles.header}>

        <div>

          <p style={styles.smallTitle}>
            AI HEALTHCARE PORTAL
          </p>

          <h1 style={styles.title}>
            Medical Reports
          </h1>

          <p style={styles.subtitle}>
            AI generated reports, discharge
            summaries, and real-time medical
            insights.
          </p>

        </div>

        <button
          style={styles.backButton}
          onClick={() =>
            navigate("/patient-dashboard")
          }
        >

          <FaArrowLeft />

          Back Dashboard

        </button>

      </div>

      {/* ======================================================
          SEARCH BAR
      ====================================================== */}

      <div style={styles.searchWrapper}>

        <div style={styles.searchBox}>

          <FaSearch color="#94a3b8" />

          <input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={styles.searchInput}
          />

        </div>

        <button style={styles.filterButton}>

          <FaFilter />

          Filter

        </button>

      </div>

      {/* ======================================================
          SUMMARY
      ====================================================== */}

      <div style={styles.summaryGrid}>

        <div style={styles.summaryCard}>

          <h3 style={styles.summaryNumber}>
            {reports.length}
          </h3>

          <p style={styles.summaryText}>
            Total Reports
          </p>

        </div>

        <div style={styles.summaryCard}>

          <h3 style={styles.summaryNumber}>
            98%
          </h3>

          <p style={styles.summaryText}>
            Recovery Score
          </p>

        </div>

        <div style={styles.summaryCard}>

          <h3 style={styles.summaryNumber}>
            Stable
          </h3>

          <p style={styles.summaryText}>
            Health Status
          </p>

        </div>

      </div>

      {/* ======================================================
          REPORTS GRID
      ====================================================== */}

      <div style={styles.grid}>

        {
          filteredReports.map((report) => (

            <div
              key={report.id}
              style={styles.card}
            >

              {/* TOP */}

              <div style={styles.cardTop}>

                <div style={styles.iconBox}>
                  {report.icon}
                </div>

                <div style={styles.statusBadge}>

                  <FaCheckCircle size={12} />

                  {report.status}

                </div>

              </div>

              {/* TITLE */}

              <h2 style={styles.cardTitle}>
                {report.title}
              </h2>

              <p style={styles.description}>
                {report.description}
              </p>

              {/* META */}

              <div style={styles.metaSection}>

                <div style={styles.metaRow}>

                  <FaCalendarAlt
                    color="#94a3b8"
                    size={13}
                  />

                  <span style={styles.metaText}>
                    {report.date}
                  </span>

                </div>

                <div style={styles.metaRow}>

                  <FaClock
                    color="#94a3b8"
                    size={13}
                  />

                  <span style={styles.metaText}>
                    {report.type}
                  </span>

                </div>

              </div>

              {/* BUTTONS */}

              <div style={styles.buttonRow}>

                <button
                  style={styles.viewButton}
                  onClick={() =>
                    setSelectedReport(report)
                  }
                >

                  <FaEye />

                  View

                </button>

                <button
                  style={styles.downloadButton}
                  onClick={() =>
                    downloadReport(report)
                  }
                >

                  <FaDownload />

                  Download

                </button>

              </div>

            </div>
          ))
        }

      </div>

      {/* ======================================================
          MODAL
      ====================================================== */}

      {
        selectedReport && (

          <div style={styles.modalOverlay}>

            <div style={styles.modal}>

              <div style={styles.modalHeader}>

                <h2 style={styles.modalTitle}>
                  {selectedReport.title}
                </h2>

                <button
                  style={styles.closeButton}
                  onClick={() =>
                    setSelectedReport(null)
                  }
                >
                  ✕
                </button>

              </div>

              <div style={styles.modalBody}>

                <p style={styles.modalInfo}>
                  <strong>Status:</strong>{" "}
                  {selectedReport.status}
                </p>

                <p style={styles.modalInfo}>
                  <strong>Doctor:</strong>{" "}
                  {selectedReport.doctor}
                </p>

                <p style={styles.modalInfo}>
                  <strong>Date:</strong>{" "}
                  {selectedReport.date}
                </p>

                <p style={styles.modalInfo}>
                  <strong>Type:</strong>{" "}
                  {selectedReport.type}
                </p>

                <div style={styles.detailBox}>

                  <h3 style={styles.detailTitle}>
                    Report Details
                  </h3>

                  <p style={styles.detailText}>
                    {
                      selectedReport.details
                    }
                  </p>

                </div>

              </div>

            </div>

          </div>
        )
      }

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
    fontFamily: "Inter, sans-serif",
    position: "relative",
    overflow: "hidden"
  },

  blur1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background:
      "rgba(34,197,94,0.15)",
    borderRadius: "50%",
    filter: "blur(120px)",
    top: "-120px",
    left: "-120px"
  },

  blur2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background:
      "rgba(59,130,246,0.15)",
    borderRadius: "50%",
    filter: "blur(120px)",
    bottom: "-120px",
    right: "-120px"
  },

  header: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    flexWrap: "wrap",
    gap: "20px"
  },

  smallTitle: {
    color: "#22c55e",
    letterSpacing: "2px",
    fontWeight: "700",
    marginBottom: "12px"
  },

  title: {
    fontSize: "52px",
    fontWeight: "900",
    marginBottom: "10px"
  },

  subtitle: {
    color: "#94a3b8",
    maxWidth: "650px",
    lineHeight: "1.8"
  },

  backButton: {
    border: "none",
    padding: "15px 24px",
    borderRadius: "16px",
    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  searchWrapper: {
    display: "flex",
    gap: "18px",
    marginBottom: "35px",
    flexWrap: "wrap"
  },

  searchBox: {
    flex: 1,
    minWidth: "280px",
    background:
      "rgba(255,255,255,0.05)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "18px",
    padding: "16px 18px",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  searchInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    fontSize: "15px"
  },

  filterButton: {
    border: "none",
    padding: "16px 22px",
    borderRadius: "18px",
    background:
      "rgba(255,255,255,0.06)",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer"
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "22px",
    marginBottom: "40px"
  },

  summaryCard: {
    background:
      "rgba(255,255,255,0.05)",
    padding: "28px",
    borderRadius: "24px",
    border:
      "1px solid rgba(255,255,255,0.08)"
  },

  summaryNumber: {
    fontSize: "38px",
    fontWeight: "900",
    color: "#22c55e",
    marginBottom: "10px"
  },

  summaryText: {
    color: "#cbd5e1"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    gap: "28px"
  },

  card: {
    background:
      "rgba(255,255,255,0.05)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "28px",
    padding: "28px",
    backdropFilter: "blur(20px)"
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px"
  },

  iconBox: {
    width: "60px",
    height: "60px",
    borderRadius: "18px",
    background:
      "rgba(255,255,255,0.05)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background:
      "rgba(34,197,94,0.15)",
    color: "#22c55e",
    padding: "8px 14px",
    borderRadius: "30px",
    fontWeight: "700",
    fontSize: "13px"
  },

  cardTitle: {
    fontSize: "24px",
    fontWeight: "800",
    marginBottom: "12px"
  },

  description: {
    color: "#94a3b8",
    lineHeight: "1.8",
    marginBottom: "24px"
  },

  metaSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "25px"
  },

  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  metaText: {
    color: "#cbd5e1"
  },

  buttonRow: {
    display: "flex",
    gap: "14px"
  },

  viewButton: {
    flex: 1,
    border: "none",
    padding: "14px",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",
    color: "white",
    fontWeight: "700",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer"
  },

  downloadButton: {
    flex: 1,
    border:
      "1px solid rgba(255,255,255,0.08)",
    padding: "14px",
    borderRadius: "14px",
    background:
      "rgba(255,255,255,0.05)",
    color: "white",
    fontWeight: "700",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer"
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background:
      "rgba(0,0,0,0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },

  modal: {
    width: "90%",
    maxWidth: "700px",
    background:
      "#0f172a",
    borderRadius: "30px",
    padding: "35px",
    border:
      "1px solid rgba(255,255,255,0.08)"
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px"
  },

  modalTitle: {
    fontSize: "30px",
    fontWeight: "900"
  },

  closeButton: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    border: "none",
    background:
      "rgba(255,255,255,0.08)",
    color: "white",
    cursor: "pointer"
  },

  modalBody: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },

  modalInfo: {
    color: "#cbd5e1",
    lineHeight: "1.8"
  },

  detailBox: {
    marginTop: "18px",
    background:
      "rgba(255,255,255,0.04)",
    padding: "24px",
    borderRadius: "20px"
  },

  detailTitle: {
    marginBottom: "14px",
    fontSize: "20px",
    fontWeight: "800"
  },

  detailText: {
    color: "#94a3b8",
    lineHeight: "1.9"
  }
};