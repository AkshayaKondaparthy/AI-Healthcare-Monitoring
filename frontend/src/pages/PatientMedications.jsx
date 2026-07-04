import React, {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  FaPills,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCapsules,
  FaCalendarAlt,
  FaBell,
  FaHeartbeat,
  FaSearch,
  FaFilter,
  FaPlus,
  FaTimes,
  FaUserMd,
  FaTrash
} from "react-icons/fa";

export default function PatientMedications() {

  /* ======================================================
      STATES
  ====================================================== */

  const [search, setSearch] = useState("");

  const [selectedMed, setSelectedMed] =
    useState(null);

  const [filter, setFilter] =
    useState("All");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [meds, setMeds] = useState([]);

  const [newMed, setNewMed] = useState({

    name: "",

    dosage: "",

    timing: "Morning",

    time: "",

    doctor: "",

    frequency: "",

    instructions: ""
  });

  /* ======================================================
      INITIAL DATA
  ====================================================== */

  useEffect(() => {

    setMeds([

      {
        id: 1,

        name: "Paracetamol",

        dosage: "500mg",

        timing: "Morning",

        time: "08:00 AM",

        status: "Taken",

        doctor: "Dr. Smith",

        frequency: "Twice Daily",

        instructions:
          "Take after breakfast with water.",

        nextDose: "Tomorrow 08:00 AM",

        color: "#22c55e",

        icon: <FaCapsules />
      },

      {
        id: 2,

        name: "Vitamin D",

        dosage: "200mg",

        timing: "Afternoon",

        time: "02:00 PM",

        status: "Pending",

        doctor: "Dr. Sarah",

        frequency: "Once Daily",

        instructions:
          "Take after lunch.",

        nextDose: "Today 02:00 PM",

        color: "#f59e0b",

        icon: <FaPills />
      },

      {
        id: 3,

        name: "Antibiotic",

        dosage: "250mg",

        timing: "Night",

        time: "09:00 PM",

        status: "Critical",

        doctor: "Dr. Michael",

        frequency: "Once Daily",

        instructions:
          "Do not skip this medication.",

        nextDose: "Today 09:00 PM",

        color: "#ef4444",

        icon: <FaHeartbeat />
      }
    ]);

  }, []);

  /* ======================================================
      FILTER + SEARCH
  ====================================================== */

  const filteredMeds = useMemo(() => {

    return meds.filter((med) => {

      const matchesSearch =
        med.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All"
          ? true
          : med.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  }, [search, filter, meds]);

  /* ======================================================
      STATS
  ====================================================== */

  const takenCount = meds.filter(
    (med) => med.status === "Taken"
  ).length;

  const pendingCount = meds.filter(
    (med) => med.status === "Pending"
  ).length;

  const criticalCount = meds.filter(
    (med) => med.status === "Critical"
  ).length;

  /* ======================================================
      MARK AS TAKEN
  ====================================================== */

  const markAsTaken = (id) => {

    const updated = meds.map((med) => {

      if (med.id === id) {

        return {
          ...med,
          status: "Taken",
          color: "#22c55e"
        };
      }

      return med;
    });

    setMeds(updated);
  };

  /* ======================================================
      DELETE MEDICATION
  ====================================================== */

  const deleteMedication = (id) => {

    const updated = meds.filter(
      (med) => med.id !== id
    );

    setMeds(updated);
  };

  /* ======================================================
      ADD MEDICATION
  ====================================================== */

  const addMedication = () => {

    if (
      !newMed.name ||
      !newMed.dosage ||
      !newMed.time
    ) {

      alert("Please fill all fields");

      return;
    }

    const medication = {

      id: Date.now(),

      name: newMed.name,

      dosage: newMed.dosage,

      timing: newMed.timing,

      time: newMed.time,

      status: "Pending",

      doctor: newMed.doctor,

      frequency: newMed.frequency,

      instructions:
        newMed.instructions,

      nextDose: `Today ${newMed.time}`,

      color: "#3b82f6",

      icon: <FaPills />
    };

    setMeds([...meds, medication]);

    setShowAddModal(false);

    setNewMed({

      name: "",

      dosage: "",

      timing: "Morning",

      time: "",

      doctor: "",

      frequency: "",

      instructions: ""
    });
  };

  return (

    <div style={styles.page}>

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div style={styles.header}>

        <div>

          <p style={styles.smallText}>
            AI HEALTHCARE PORTAL
          </p>

          <h1 style={styles.title}>
            Medications
          </h1>

          <p style={styles.subtitle}>
            Manage prescriptions, reminders,
            schedules, and medication tracking.
          </p>

        </div>

        <div style={styles.notificationBox}>

          <FaBell />

          <span>
            {meds.length} Active Medications
          </span>

        </div>

      </div>

      {/* ======================================================
          SEARCH + FILTER
      ====================================================== */}

      <div style={styles.searchWrapper}>

        <div style={styles.searchBox}>

          <FaSearch color="#94a3b8" />

          <input
            type="text"
            placeholder="Search medications..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={styles.searchInput}
          />

        </div>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          style={styles.select}
        >

          <option value="All">
            All
          </option>

          <option value="Taken">
            Taken
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Critical">
            Critical
          </option>

        </select>

        <button
          style={styles.addButton}
          onClick={() =>
            setShowAddModal(true)
          }
        >

          <FaPlus />

          Add Medication

        </button>

      </div>

      {/* ======================================================
          STATS
      ====================================================== */}

      <div style={styles.statsGrid}>

        <div style={styles.statCard}>

          <div style={styles.greenIcon}>
            <FaCheckCircle />
          </div>

          <div>

            <h2 style={styles.statNumber}>
              {takenCount}
            </h2>

            <p style={styles.statText}>
              Doses Taken
            </p>

          </div>

        </div>

        <div style={styles.statCard}>

          <div style={styles.orangeIcon}>
            <FaClock />
          </div>

          <div>

            <h2 style={styles.statNumber}>
              {pendingCount}
            </h2>

            <p style={styles.statText}>
              Upcoming Doses
            </p>

          </div>

        </div>

        <div style={styles.statCard}>

          <div style={styles.redIcon}>
            <FaExclamationTriangle />
          </div>

          <div>

            <h2 style={styles.statNumber}>
              {criticalCount}
            </h2>

            <p style={styles.statText}>
              Critical Alerts
            </p>

          </div>

        </div>

      </div>

      {/* ======================================================
          MEDICATION LIST
      ====================================================== */}

      <div style={styles.medicationContainer}>

        {
          filteredMeds.map((med) => (

            <div
              key={med.id}
              style={styles.card}
            >

              <div style={styles.leftSection}>

                <div
                  style={{
                    ...styles.medIcon,
                    background:
                      `${med.color}20`,
                    color: med.color
                  }}
                >
                  {med.icon}
                </div>

                <div>

                  <h2 style={styles.medName}>
                    {med.name}
                  </h2>

                  <div style={styles.infoRow}>

                    <span style={styles.badge}>
                      {med.dosage}
                    </span>

                    <span style={styles.dot}></span>

                    <span>
                      {med.timing}
                    </span>

                    <span style={styles.dot}></span>

                    <span>
                      {med.time}
                    </span>

                  </div>

                </div>

              </div>

              <div style={styles.rightSection}>

                <div
                  style={{
                    ...styles.statusBadge,
                    background:
                      `${med.color}20`,
                    color: med.color
                  }}
                >
                  {med.status}
                </div>

                <button
                  style={styles.viewButton}
                  onClick={() =>
                    setSelectedMed(med)
                  }
                >
                  View
                </button>

                {
                  med.status !== "Taken" && (

                    <button
                      style={styles.takeButton}
                      onClick={() =>
                        markAsTaken(med.id)
                      }
                    >
                      Mark Taken
                    </button>
                  )
                }

                <button
                  style={styles.deleteButton}
                  onClick={() =>
                    deleteMedication(med.id)
                  }
                >
                  <FaTrash />
                </button>

              </div>

            </div>
          ))
        }

      </div>

      {/* ======================================================
          DETAILS MODAL
      ====================================================== */}

      {
        selectedMed && (

          <div style={styles.modalOverlay}>

            <div style={styles.modal}>

              <div style={styles.modalHeader}>

                <h2>
                  {selectedMed.name}
                </h2>

                <button
                  style={styles.closeButton}
                  onClick={() =>
                    setSelectedMed(null)
                  }
                >
                  <FaTimes />
                </button>

              </div>

              <div style={styles.modalBody}>

                <p>
                  <strong>Dosage:</strong>{" "}
                  {selectedMed.dosage}
                </p>

                <p>
                  <strong>Timing:</strong>{" "}
                  {selectedMed.timing}
                </p>

                <p>
                  <strong>Doctor:</strong>{" "}
                  {selectedMed.doctor}
                </p>

                <p>
                  <strong>Frequency:</strong>{" "}
                  {
                    selectedMed.frequency
                  }
                </p>

                <p>
                  <strong>Next Dose:</strong>{" "}
                  {selectedMed.nextDose}
                </p>

                <div
                  style={
                    styles.instructionsBox
                  }
                >

                  <FaUserMd />

                  <p>
                    {
                      selectedMed.instructions
                    }
                  </p>

                </div>

              </div>

            </div>

          </div>
        )
      }

      {/* ======================================================
          ADD MODAL
      ====================================================== */}

      {
        showAddModal && (

          <div style={styles.modalOverlay}>

            <div style={styles.modal}>

              <div style={styles.modalHeader}>

                <h2>
                  Add Medication
                </h2>

                <button
                  style={styles.closeButton}
                  onClick={() =>
                    setShowAddModal(false)
                  }
                >
                  <FaTimes />
                </button>

              </div>

              <div style={styles.form}>

                <input
                  type="text"
                  placeholder="Medicine Name"
                  value={newMed.name}
                  onChange={(e) =>
                    setNewMed({
                      ...newMed,
                      name:
                        e.target.value
                    })
                  }
                  style={styles.input}
                />

                <input
                  type="text"
                  placeholder="Dosage"
                  value={newMed.dosage}
                  onChange={(e) =>
                    setNewMed({
                      ...newMed,
                      dosage:
                        e.target.value
                    })
                  }
                  style={styles.input}
                />

                <input
                  type="text"
                  placeholder="Time"
                  value={newMed.time}
                  onChange={(e) =>
                    setNewMed({
                      ...newMed,
                      time:
                        e.target.value
                    })
                  }
                  style={styles.input}
                />

                <input
                  type="text"
                  placeholder="Doctor"
                  value={newMed.doctor}
                  onChange={(e) =>
                    setNewMed({
                      ...newMed,
                      doctor:
                        e.target.value
                    })
                  }
                  style={styles.input}
                />

                <textarea
                  placeholder="Instructions"
                  value={
                    newMed.instructions
                  }
                  onChange={(e) =>
                    setNewMed({
                      ...newMed,
                      instructions:
                        e.target.value
                    })
                  }
                  style={styles.textarea}
                />

                <button
                  style={styles.submitButton}
                  onClick={addMedication}
                >
                  Add Medication
                </button>

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
    fontFamily: "Inter, sans-serif"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "35px"
  },

  smallText: {
    color: "#22c55e",
    letterSpacing: "2px",
    marginBottom: "10px"
  },

  title: {
    fontSize: "52px",
    fontWeight: "900"
  },

  subtitle: {
    color: "#94a3b8",
    marginTop: "10px"
  },

  notificationBox: {
    background:
      "rgba(255,255,255,0.06)",
    padding: "14px 20px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  searchWrapper: {
    display: "flex",
    gap: "16px",
    marginBottom: "35px",
    flexWrap: "wrap"
  },

  searchBox: {
    flex: 1,
    background:
      "rgba(255,255,255,0.05)",
    padding: "14px 18px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  searchInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white"
  },

  select: {
    background: "#1e293b",
    color: "white",
    border: "none",
    borderRadius: "14px",
    padding: "14px"
  },

  addButton: {
    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",
    border: "none",
    color: "white",
    padding: "14px 22px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    fontWeight: "700"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",
    gap: "24px",
    marginBottom: "35px"
  },

  statCard: {
    background:
      "rgba(255,255,255,0.05)",
    padding: "28px",
    borderRadius: "24px",
    display: "flex",
    alignItems: "center",
    gap: "18px"
  },

  greenIcon: {
    color: "#22c55e",
    fontSize: "28px"
  },

  orangeIcon: {
    color: "#f59e0b",
    fontSize: "28px"
  },

  redIcon: {
    color: "#ef4444",
    fontSize: "28px"
  },

  statNumber: {
    fontSize: "30px",
    fontWeight: "800"
  },

  statText: {
    color: "#94a3b8"
  },

  medicationContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  card: {
    background:
      "rgba(255,255,255,0.05)",
    borderRadius: "24px",
    padding: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px"
  },

  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "18px"
  },

  medIcon: {
    width: "70px",
    height: "70px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px"
  },

  medName: {
    fontSize: "24px",
    fontWeight: "700"
  },

  infoRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginTop: "8px"
  },

  badge: {
    background:
      "rgba(34,197,94,0.15)",
    color: "#22c55e",
    padding: "6px 12px",
    borderRadius: "999px"
  },

  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#64748b"
  },

  rightSection: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap"
  },

  statusBadge: {
    padding: "10px 16px",
    borderRadius: "999px",
    fontWeight: "700"
  },

  viewButton: {
    background:
      "linear-gradient(135deg,#3b82f6,#2563eb)",
    border: "none",
    padding: "12px 18px",
    borderRadius: "12px",
    color: "white",
    cursor: "pointer"
  },

  takeButton: {
    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",
    border: "none",
    padding: "12px 18px",
    borderRadius: "12px",
    color: "white",
    cursor: "pointer"
  },

  deleteButton: {
    background:
      "rgba(239,68,68,0.15)",
    border: "none",
    color: "#ef4444",
    width: "45px",
    height: "45px",
    borderRadius: "12px",
    cursor: "pointer"
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background:
      "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },

  modal: {
    width: "90%",
    maxWidth: "600px",
    background: "#0f172a",
    borderRadius: "28px",
    padding: "30px"
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px"
  },

  closeButton: {
    background:
      "rgba(255,255,255,0.08)",
    border: "none",
    color: "white",
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    cursor: "pointer"
  },

  modalBody: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },

  instructionsBox: {
    marginTop: "16px",
    background:
      "rgba(255,255,255,0.05)",
    padding: "18px",
    borderRadius: "18px",
    display: "flex",
    gap: "12px",
    alignItems: "flex-start"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },

  input: {
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    background:
      "rgba(255,255,255,0.06)",
    color: "white"
  },

  textarea: {
    minHeight: "120px",
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    background:
      "rgba(255,255,255,0.06)",
    color: "white"
  },

  submitButton: {
    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",
    border: "none",
    padding: "16px",
    borderRadius: "14px",
    color: "white",
    fontWeight: "700",
    cursor: "pointer"
  }
};