import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import {
  FaHeartbeat,
  FaDatabase,
  FaBrain,
  FaRobot,
  FaBell,
  FaMicrophoneAlt,
  FaShieldAlt,
  FaCloudUploadAlt,
  FaServer,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
  FaPlay,
  FaPause,
  FaRedo,
  FaUserInjured,
  FaPhoneAlt,
  FaVideo,
  FaClock,
  FaChartLine,
  FaNotesMedical,
  FaExclamationTriangle,
  FaWifi,
  FaSpinner
} from "react-icons/fa";

import "../styles/workflow.css";

export default function Workflow() {

  const navigate = useNavigate();

  /* ======================================================
      STATES
  ====================================================== */

  const [patients, setPatients] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [activePatient, setActivePatient] =
    useState(0);

  const [activeStage, setActiveStage] =
    useState(0);

  const [running, setRunning] =
    useState(false);

  const [time, setTime] =
    useState("");

  const [logs, setLogs] =
    useState([]);

  const [workflowData, setWorkflowData] =
    useState({});

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

      setLoading(true);

      const res =
        await axios.get(API);

      setPatients(res.data);

    } catch (err) {

      console.log(err);

      alert(
        "Failed to load patients"
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchPatients();

  }, []);

  /* ======================================================
      LIVE CLOCK
  ====================================================== */

  useEffect(() => {

    const timer =
      setInterval(() => {

        const now =
          new Date();

        setTime(

          now.toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit"

          })

        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, []);

  /* ======================================================
      STAGES
  ====================================================== */

  const stages = [

    {
      title: "Trigger Event",
      icon: <FaHeartbeat />,
      color: "#ef4444",
      description:
        "Detecting abnormal patient vitals"
    },

    {
      title: "Fetch Data",
      icon: <FaDatabase />,
      color: "#3b82f6",
      description:
        "Retrieving patient records"
    },

    {
      title: "Context Creation",
      icon: <FaBrain />,
      color: "#8b5cf6",
      description:
        "Preparing AI memory context"
    },

    {
      title: "LLM Execution",
      icon: <FaRobot />,
      color: "#22c55e",
      description:
        "AI analyzing patient condition"
    },

    {
      title: "Communication",
      icon: <FaBell />,
      color: "#f59e0b",
      description:
        "Sending notifications to doctor"
    },

    {
      title: "Speech AI",
      icon: <FaMicrophoneAlt />,
      color: "#06b6d4",
      description:
        "Generating AI voice response"
    },

    {
      title: "Decision Engine",
      icon: <FaShieldAlt />,
      color: "#ec4899",
      description:
        "Classifying patient risk"
    },

    {
      title: "Cloud Sync",
      icon: <FaCloudUploadAlt />,
      color: "#14b8a6",
      description:
        "Syncing workflow to cloud"
    },

    {
      title: "Logging",
      icon: <FaServer />,
      color: "#64748b",
      description:
        "Saving audit logs"
    }

  ];

  /* ======================================================
      CURRENT PATIENT
  ====================================================== */

  const patient =
    patients[activePatient];

  /* ======================================================
      RISK LEVEL
  ====================================================== */

  const getRisk = (score) => {

    if (score >= 85)
      return "Stable";

    if (score >= 60)
      return "Moderate";

    return "Critical";
  };

  /* ======================================================
      STAGE ACTIONS
  ====================================================== */

  const executeStage =
    async (stageIndex) => {

      if (!patient) return;

      const stage =
        stages[stageIndex];

      let result = {};

      switch (stage.title) {

        /* =========================================
            1. EVENT
        ========================================= */

        case "Trigger Event":

          result = {

            event:
              patient.score < 60
                ? "Critical vitals detected"
                : "Vitals under observation",

            heartRate:
              patient.score < 60
                ? "125 BPM"
                : "88 BPM",

            spo2:
              patient.score < 60
                ? "90%"
                : "97%"
          };

          break;

        /* =========================================
            2. FETCH DATA
        ========================================= */

        case "Fetch Data":

          result = {

            patientId:
              patient.id,

            patientName:
              patient.name,

            diagnosis:
              patient.diagnosis,

            phone:
              patient.phone,

            healthScore:
              patient.score
          };

          break;

        /* =========================================
            3. CONTEXT
        ========================================= */

        case "Context Creation":

          result = {

            aiContext:
              `Patient ${patient.name}
              diagnosed with
              ${patient.diagnosis}
              having health score
              ${patient.score}`,

            tokensUsed:
              512
          };

          break;

        /* =========================================
            4. AI EXECUTION
        ========================================= */

        case "LLM Execution":

          result = {

            aiPrediction:
              patient.score < 60
                ? "High Risk"
                : "Stable Condition",

            confidence:
              "98.2%"
          };

          break;

        /* =========================================
            5. COMMUNICATION
        ========================================= */

        case "Communication":

          result = {

            doctor:
              "Dr. Sarah Johnson",

            sms:
              "Alert sent successfully",

            call:
              "Emergency call triggered"
          };

          break;

        /* =========================================
            6. SPEECH AI
        ========================================= */

        case "Speech AI":

          result = {

            speech:
              patient.score < 60
                ? "Critical patient condition detected."
                : "Patient condition stable."
          };

          break;

        /* =========================================
            7. DECISION
        ========================================= */

        case "Decision Engine":

          result = {

            finalDecision:
              getRisk(patient.score),

            probability:
              patient.score < 60
                ? "91%"
                : "23%"
          };

          break;

        /* =========================================
            8. CLOUD
        ========================================= */

        case "Cloud Sync":

          result = {

            sync:
              "Cloud synchronization completed",

            timestamp:
              new Date().toLocaleString()
          };

          break;

        /* =========================================
            9. LOGGING
        ========================================= */

        case "Logging":

          result = {

            log:
              "Workflow audit stored successfully",

            workflowId:
              `WF-${Date.now()}`
          };

          break;

        default:

          result = {};
      }

      setWorkflowData(result);

      setLogs(prev => [

        ...prev,

        `${stage.title} completed for ${patient.name}`

      ]);
    };

  /* ======================================================
      AUTO RUN
  ====================================================== */

  useEffect(() => {

    let interval;

    if (running && patient) {

      executeStage(activeStage);

      interval =
        setInterval(() => {

          setActiveStage(prev => {

            const next =
              (prev + 1) %
              stages.length;

            executeStage(next);

            return next;

          });

        }, 3000);
    }

    return () =>
      clearInterval(interval);

  }, [
    running,
    activeStage,
    patient
  ]);

  /* ======================================================
      NEXT PATIENT
  ====================================================== */

  const nextPatient = () => {

    if (
      activePatient <
      patients.length - 1
    ) {

      setActivePatient(
        prev => prev + 1
      );

      setActiveStage(0);

      setLogs([]);

      setWorkflowData({});
    }
  };

  /* ======================================================
      PREVIOUS PATIENT
  ====================================================== */

  const previousPatient = () => {

    if (
      activePatient > 0
    ) {

      setActivePatient(
        prev => prev - 1
      );

      setActiveStage(0);

      setLogs([]);

      setWorkflowData({});
    }
  };

  /* ======================================================
      NEXT STAGE
  ====================================================== */

  const nextStage = () => {

    const next =
      (activeStage + 1) %
      stages.length;

    setActiveStage(next);

    executeStage(next);
  };

  /* ======================================================
      RESET
  ====================================================== */

  const resetWorkflow = () => {

    setRunning(false);

    setActiveStage(0);

    setLogs([]);

    setWorkflowData({});
  };

  /* ======================================================
      LOADER
  ====================================================== */

  if (loading) {

    return (

      <div className="workflow-loader">

        <FaSpinner className="spin-icon" />

        <h2>
          Loading Workflow Engine...
        </h2>

      </div>
    );
  }

  /* ======================================================
      UI
  ====================================================== */

  return (

    <div className="workflow-page">

      {/* HERO */}

      <div className="workflow-hero">

        <div>

          <h1>
            ⚙️ AI Workflow Engine
          </h1>

          <p>
            Dynamic AI workflow execution
            for all patients in hospital.
          </p>

        </div>

        <div className="hero-right">

          <div className="hero-badge">

            <FaChartLine />

            SYSTEM ACTIVE

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
            navigate("/patient-dashboard")
          }
        >

          <FaDatabase />

          Dashboard

        </button>

        <button
  onClick={() =>
    navigate("/live")
  }
>

  <FaVideo />

  Live Session

</button>
        

      </div>

      {/* STATS */}

      <div className="stats-grid">

        <div className="stat-card red">

          <h2>
            {patients.length}
          </h2>

          <p>
            Total Patients
          </p>

        </div>

        <div className="stat-card blue">

          <h2>
            {activePatient + 1}
          </h2>

          <p>
            Current Patient
          </p>

        </div>

        <div className="stat-card green">

          <h2>
            {Math.floor(
              ((activeStage + 1) /
                stages.length) *
              100
            )}%
          </h2>

          <p>
            Workflow Progress
          </p>

        </div>

        <div className="stat-card purple">

          <h2>
            LIVE
          </h2>

          <p>
            AI Monitoring
          </p>

        </div>

      </div>

      {/* PATIENT NAVIGATION */}

      <div className="workflow-controls">

        <button
          className="next-btn"
          onClick={previousPatient}
        >

          <FaArrowLeft />

          Previous Patient

        </button>

        <button
          className="next-btn"
          onClick={nextPatient}
        >

          Next Patient

          <FaArrowRight />

        </button>

      </div>

      {/* PATIENT DETAILS */}

      {patient && (

        <div className="patient-overview">

          <div className="patient-card">

            <div className="patient-avatar">

              <FaUserInjured />

            </div>

            <div>

              <h2>
                {patient.name}
              </h2>

              <p>
                Patient ID:
                {" "}
                {patient.id}
              </p>

              <p>
                Diagnosis:
                {" "}
                {patient.diagnosis}
              </p>

              <p>
                Phone:
                {" "}
                {patient.phone}
              </p>

            </div>

          </div>

          <div className="vitals-grid">

            <div className="vital-box">

              <FaHeartbeat />

              Score:
              {" "}
              {patient.score}

            </div>

            <div className="vital-box">

              <FaShieldAlt />

              {getRisk(
                patient.score
              )}

            </div>

            <div className="vital-box">

              <FaNotesMedical />

              {patient.status}

            </div>

          </div>

        </div>

      )}

      {/* CONTROLS */}

      <div className="workflow-controls">

        <button
          className="play-btn"
          onClick={() =>
            setRunning(!running)
          }
        >

          {
            running
              ? <FaPause />
              : <FaPlay />
          }

          {
            running
              ? "Pause Workflow"
              : "Start Workflow"
          }

        </button>

        <button
          className="next-btn"
          onClick={nextStage}
        >

          <FaArrowRight />

          Next Stage

        </button>

        <button
          className="reset-btn"
          onClick={resetWorkflow}
        >

          <FaRedo />

          Reset

        </button>

      </div>

      {/* STAGES */}

      <div className="workflow-grid">

        {
          stages.map(
            (stage, i) => (

              <div
                key={i}
                className={`workflow-card
                ${i === activeStage
                    ? "active"
                    : ""
                  }
                ${i < activeStage
                    ? "completed"
                    : ""
                  }
                `}
              >

                <div
                  className="workflow-icon"
                  style={{
                    background:
                      `${stage.color}20`,
                    color:
                      stage.color
                  }}
                >

                  {stage.icon}

                </div>

                <div className="workflow-info">

                  <div className="workflow-head">

                    <span className="workflow-number">

                      0{i + 1}

                    </span>

                    {
                      i <
                        activeStage && (

                        <FaCheckCircle className="done-icon" />

                      )
                    }

                  </div>

                  <h3>
                    {stage.title}
                  </h3>

                  <p>
                    {
                      stage.description
                    }
                  </p>

                  {
                    i ===
                      activeStage && (

                      <div className="live-processing">

                        <div className="pulse-dot" />

                        Processing
                        {" "}
                        {patient?.name}

                      </div>

                    )
                  }

                </div>

              </div>

            )
          )
        }

      </div>

      {/* ENGINE */}

      <div className="engine-panel">

        <div className="panel-header">

          <h2>
            🧠 AI Engine Output
          </h2>

          <div className="live-tag">

            <FaWifi />

            LIVE

          </div>

        </div>

        {/* CURRENT OUTPUT */}

        <div className="engine-box">

          <h3>
            {
              stages[
                activeStage
              ].title
            }
          </h3>

          <p>

            Currently processing
            {" "}
            <strong>
              {patient?.name}
            </strong>

          </p>

          <pre>
{JSON.stringify(
  workflowData,
  null,
  2
)}
          </pre>

        </div>

        {/* LOGS */}

        <div className="engine-box gray">

          <h3>
            Workflow Logs
          </h3>

          {
            logs.length === 0 ? (

              <div className="log-item">

                <FaCheckCircle />

                Workflow initialized

              </div>

            ) : (

              logs.map(
                (log, i) => (

                  <div
                    key={i}
                    className="log-item"
                  >

                    <FaExclamationTriangle />

                    {log}

                  </div>

                )
              )

            )
          }

        </div>

      </div>

    </div>
  );
}