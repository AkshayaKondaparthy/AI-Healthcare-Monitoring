import React, {
  useEffect,
  useMemo,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import {
  FaHeartbeat,
  FaUserInjured,
  FaBell,
  FaRobot,
  FaNotesMedical,
  FaBrain,
  FaCheckCircle,
  FaClock,
  FaDatabase,
  FaArrowRight,
  FaWifi,
  FaTrash,
  FaSyncAlt,
  FaVideo
} from "react-icons/fa";

import "../styles/trigger.css";

export default function TriggerForm() {

  const navigate = useNavigate();

  /* ======================================================
      STATES
  ====================================================== */

  const [patients, setPatients] =
    useState([]);

  const [selectedPatient, setSelectedPatient] =
    useState("");

  const [severity, setSeverity] =
    useState("normal");

  const [loading, setLoading] =
    useState(false);

  const [workflowRunning, setWorkflowRunning] =
    useState(false);

  const [workflowStage, setWorkflowStage] =
    useState(0);

  const [logs, setLogs] =
    useState([]);

  const [engineLogs, setEngineLogs] =
    useState([]);

  const [triggerCount, setTriggerCount] =
    useState(0);

  const [time, setTime] =
    useState("");

  const [data, setData] =
    useState({

      patientId: "",

      name: "",

      heartRate: "",

      bp: "",

      spo2: "",

      glucose: "",

      symptoms: "",

      type: "routine"
    });

  /* ======================================================
      API
  ====================================================== */

  const API =
    "http://127.0.0.1:8000/patients";

  /* ======================================================
      FETCH PATIENTS
  ====================================================== */

  const fetchPatients = async () => {

    try {

      const res =
        await axios.get(API);

      console.log(
        "PATIENTS:",
        res.data
      );

      if (
        Array.isArray(res.data)
      ) {

        setPatients(res.data);

      } else {

        setPatients([]);
      }

    } catch (err) {

      console.log(err);

      alert(
        "Failed to fetch patients"
      );
    }
  };

  useEffect(() => {

    fetchPatients();

  }, []);

  /* ======================================================
      LIVE TIME
  ====================================================== */

  useEffect(() => {

    const timer =
      setInterval(() => {

        setTime(

          new Date().toLocaleTimeString()

        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, []);

  /* ======================================================
      WORKFLOW STAGES
  ====================================================== */

  const workflowStages = [

    "Trigger Event",

    "Fetch Patient Data",

    "AI Context Creation",

    "LLM Risk Analysis",

    "Doctor Notification",

    "Speech AI Response",

    "Decision Engine",

    "Cloud Sync",

    "Audit Logging"
  ];

  /* ======================================================
      SELECT PATIENT
  ====================================================== */

  const handlePatientSelect = (e) => {

    const selectedId =
      e.target.value;

    setSelectedPatient(
      selectedId
    );

    console.log(
      "SELECTED ID:",
      selectedId
    );

    const patient =
      patients.find(
        (p) =>
          p.id === selectedId
      );

    console.log(
      "FOUND PATIENT:",
      patient
    );

    if (!patient) {

      alert(
        "Patient not found"
      );

      return;
    }

    const critical =
      patient.score < 60;

    const updated = {

      patientId:
        patient.id,

      name:
        patient.name || "",

      heartRate:
        critical
          ? "128"
          : "84",

      bp:
        critical
          ? "180/110"
          : "120/80",

      spo2:
        critical
          ? "89%"
          : "98%",

      glucose:
        critical
          ? "220"
          : "110",

      symptoms:
        patient.diagnosis || "",

      type:
        critical
          ? "emergency"
          : "routine"
    };

    setData(updated);

    setSeverity(
      critical
        ? "critical"
        : "normal"
    );

    setEngineLogs([

      `Patient Selected: ${patient.name}`,

      `Diagnosis: ${patient.diagnosis}`,

      `Health Score: ${patient.score}`
    ]);
  };

  /* ======================================================
      HANDLE CHANGE
  ====================================================== */

  const handleChange = (
    field,
    value
  ) => {

    const updated = {

      ...data,

      [field]: value
    };

    setData(updated);

    const hr =
      parseInt(
        updated.heartRate || 0
      );

    const bp =
      updated.bp || "";

    if (
      hr > 120 ||
      bp.includes("180")
    ) {

      setSeverity(
        "critical"
      );

    } else if (
      hr > 100
    ) {

      setSeverity(
        "moderate"
      );

    } else {

      setSeverity(
        "normal"
      );
    }
  };

  /* ======================================================
      WORKFLOW ENGINE
  ====================================================== */

  useEffect(() => {

    let interval;

    if (
      workflowRunning
    ) {

      interval =
        setInterval(() => {

          setWorkflowStage(
            (prev) => {

              const next =
                prev + 1;

              if (
                next >=
                workflowStages.length
              ) {

                setWorkflowRunning(
                  false
                );

                return prev;
              }

              setEngineLogs(
                (prevLogs) => [

                  ...prevLogs,

                  `${workflowStages[next]} completed`
                ]
              );

              return next;
            }
          );

        }, 2000);
    }

    return () =>
      clearInterval(interval);

  }, [workflowRunning]);

  /* ======================================================
      SUBMIT
  ====================================================== */

  const handleSubmit = () => {

    if (
      !data.name
    ) {

      alert(
        "Please select patient"
      );

      return;
    }

    setLoading(true);

    setWorkflowStage(0);

    setTimeout(() => {

      setLogs((prev) => [

        {

          ...data,

          severity,

          time:
            new Date().toLocaleTimeString()
        },

        ...prev
      ]);

      setTriggerCount(
        (prev) =>
          prev + 1
      );

      setWorkflowRunning(
        true
      );

      setLoading(false);

      alert(
        "🚨 AI Trigger Activated"
      );

    }, 1000);
  };

  /* ======================================================
      RESET
  ====================================================== */

  const resetAll = () => {

    setSelectedPatient("");

    setData({

      patientId: "",

      name: "",

      heartRate: "",

      bp: "",

      spo2: "",

      glucose: "",

      symptoms: "",

      type: "routine"
    });

    setSeverity(
      "normal"
    );

    setWorkflowRunning(
      false
    );

    setWorkflowStage(0);

    setEngineLogs([]);
  };

  /* ======================================================
      CRITICAL PATIENTS
  ====================================================== */

  const criticalPatients =
    useMemo(() => {

      return patients.filter(
        (p) =>
          p.score < 60
      ).length;

    }, [patients]);

  /* ======================================================
      UI
  ====================================================== */

  return (

    <div className="trigger-container">

      {/* HERO */}

      <div className="trigger-hero">

        <div>

          <h1>
            ⚡ AI Trigger Engine
          </h1>

          <p>
            Smart hospital AI workflow system
          </p>

        </div>

        <div className="hero-status">

          <div className="live-badge">

            <FaWifi />

            ONLINE

          </div>

          <div className="time-badge">

            <FaClock />

            {time}

          </div>

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="quick-actions">

        <button
          onClick={() =>
            navigate("/patients")
          }
        >

          <FaUserInjured />

          Patients

        </button>

        <button
          onClick={() =>
            navigate("/workflow")
          }
        >

          <FaRobot />

          Workflow

        </button>

        <button
          onClick={() =>
            navigate("/patient-live")
          }
        >

          <FaVideo />

          Live Session

        </button>

      </div>

      {/* STATS */}

      <div className="stats-grid">

        <div className="stat-card">

          <h2>
            {patients.length}
          </h2>

          <p>
            Total Patients
          </p>

        </div>

        <div className="stat-card">

          <h2>
            {criticalPatients}
          </h2>

          <p>
            Critical Patients
          </p>

        </div>

        <div className="stat-card">

          <h2>
            {triggerCount}
          </h2>

          <p>
            Triggers Sent
          </p>

        </div>

      </div>

      {/* MAIN GRID */}

      <div className="trigger-grid">

        {/* LEFT */}

        <div className="trigger-card">

          <h3>
            🚨 Patient Trigger
          </h3>

        <select
  value={selectedPatient}
  onChange={(e) => {

    const patientId =
      e.target.value;

    console.log(
      "SELECTED:",
      patientId
    );

    setSelectedPatient(
      patientId
    );

    const patient =
      patients.find(
        (p) =>
          p.id === patientId
      );

    console.log(
      "FOUND:",
      patient
    );

    if (!patient) return;

    const critical =
      patient.score < 60;

    setData({

      patientId:
        patient.id,

      name:
        patient.name,

      heartRate:
        critical
          ? "128"
          : "84",

      bp:
        critical
          ? "180/110"
          : "120/80",

      spo2:
        critical
          ? "89%"
          : "98%",

      glucose:
        critical
          ? "220"
          : "110",

      symptoms:
        patient.diagnosis,

      type:
        critical
          ? "emergency"
          : "routine"
    });

    setSeverity(
      critical
        ? "critical"
        : "normal"
    );
  }}
>

  <option value="">
    Select Patient
  </option>

  {
    patients.map((patient) => (

      <option
        key={patient.id}
        value={patient.id}
      >

        {patient.name}
        {" "}
        ({patient.id})

      </option>

    ))
  }

</select>

          {/* DEBUG */}

          <p
            style={{
              color: "white",
              marginTop: "10px"
            }}
          >

            Selected:
            {" "}
            {selectedPatient}

          </p>

          {/* INPUTS */}

          <input
            value={data.name}
            placeholder="Patient Name"
            readOnly
          />

          <input
            value={data.heartRate}
            placeholder="Heart Rate"
            readOnly
          />

          <input
            value={data.bp}
            placeholder="Blood Pressure"
            readOnly
          />

          <input
            value={data.spo2}
            placeholder="SPO2"
            readOnly
          />

          <input
            value={data.glucose}
            placeholder="Glucose"
            readOnly
          />

          <input
            value={data.symptoms}
            placeholder="Symptoms"
            readOnly
          />

          {/* BUTTONS */}

          <div className="button-row">

            <button
              className="submit-btn"
              onClick={
                handleSubmit
              }
              disabled={loading}
            >

              {
                loading
                  ? "Processing..."
                  : "Send Trigger"
              }

              <FaArrowRight />

            </button>

            <button
              className="reset-btn"
              onClick={
                resetAll
              }
            >

              <FaTrash />

              Reset

            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="trigger-card">

          <h3>
            📊 Live Preview
          </h3>

          <p>
            Patient:
            {" "}
            <strong>
              {data.name || "--"}
            </strong>
          </p>

          <p>
            Severity:
            {" "}

            <strong>
              {severity.toUpperCase()}
            </strong>

          </p>

          {/* WORKFLOW */}

          <div className="workflow-live">

            {
              workflowStages.map(
                (
                  stage,
                  index
                ) => (

                  <div
                    key={index}
                    className="workflow-step"
                  >

                    {
                      index <
                      workflowStage ? (

                        <FaCheckCircle />

                      ) : (

                        <FaSyncAlt />
                      )
                    }

                    {stage}

                  </div>

                )
              )
            }

          </div>

        </div>

      </div>

      {/* LOGS */}

      <div className="trigger-logs">

        <h3>
          📜 Trigger Logs
        </h3>

        {
          logs.length === 0 ? (

            <p>
              No logs yet
            </p>

          ) : (

            logs.map(
              (log, index) => (

                <div
                  key={index}
                  className={`log ${log.severity}`}
                >

                  <strong>
                    {log.name}
                  </strong>

                  <p>
                    HR:
                    {" "}
                    {log.heartRate}
                  </p>

                  <p>
                    BP:
                    {" "}
                    {log.bp}
                  </p>

                  <p>
                    SPO2:
                    {" "}
                    {log.spo2}
                  </p>

                  <p>
                    Severity:
                    {" "}
                    {log.severity}
                  </p>

                  <small>
                    {log.time}
                  </small>

                </div>

              )
            )

          )
        }

      </div>

      {/* ENGINE LOGS */}

      <div className="trigger-logs">

        <h3>
          ⚙️ Engine Logs
        </h3>

        {
          engineLogs.map(
            (
              log,
              index
            ) => (

              <div
                key={index}
                className="engine-log"
              >

                <FaCheckCircle />

                {log}

              </div>

            )
          )
        }

      </div>

    </div>
  );
}