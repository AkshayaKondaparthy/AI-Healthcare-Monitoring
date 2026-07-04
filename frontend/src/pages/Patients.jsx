import React, {
  useEffect,
  useMemo,
  useState
} from "react";

import axios from "axios";

import {
  FaSearch,
  FaUserInjured,
  FaHeartbeat,
  FaPlus,
  FaPhoneAlt,
  FaTrash,
  FaSyncAlt,
  FaNotesMedical
} from "react-icons/fa";

import "../styles/patients.css";

export default function Patients() {

  /* ======================================================
      STATES
  ====================================================== */

  const [patients, setPatients] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  const [loading, setLoading] =
    useState(true);

  const [calling, setCalling] =
    useState("");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [newPatient, setNewPatient] =
    useState({

      name: "",
      diagnosis: "",
      phone: "",
      score: 70
    });

  /* ======================================================
      API
  ====================================================== */

  const API =
    "http://127.0.0.1:8000/patients";

  const TWILIO_API =
    "http://127.0.0.1:8000/api/twilio/doctor-call";

  /* ======================================================
      FETCH PATIENTS
  ====================================================== */

  const fetchPatients = async () => {

    try {

      setLoading(true);

      const res = await axios.get(API);

      setPatients(res.data);

    } catch (err) {

      console.log(err);

      alert("Backend not connected");

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchPatients();

  }, []);

  /* ======================================================
      FILTER
  ====================================================== */

  const filteredPatients = useMemo(() => {

    return patients.filter((p) => {

      const searchMatch =

        p.name
          ?.toLowerCase()
          .includes(search.toLowerCase())

        ||

        p.id
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const filterMatch =

        filter === "all"

          ? true

          : p.status?.toLowerCase() ===
            filter.toLowerCase();

      return (
        searchMatch &&
        filterMatch
      );

    });

  }, [patients, search, filter]);

  /* ======================================================
      ADD PATIENT
  ====================================================== */

  const addPatient = async () => {

    if (
      !newPatient.name ||
      !newPatient.diagnosis ||
      !newPatient.phone
    ) {

      alert("Fill all fields");

      return;
    }

    try {

      const patientData = {

        id: `PT${Math.floor(
          Math.random() * 900 + 100
        )}`,

        name: newPatient.name,

        diagnosis:
          newPatient.diagnosis,

        phone: newPatient.phone,

        score: Number(
          newPatient.score
        ),

        status:
          Number(newPatient.score) > 60
            ? "Stable"
            : "Critical"
      };

      await axios.post(
        API,
        patientData
      );

      await fetchPatients();

      setShowAddModal(false);

      setNewPatient({

        name: "",
        diagnosis: "",
        phone: "",
        score: 70
      });

      alert(
        "Patient added successfully"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Failed to add patient"
      );
    }
  };

  /* ======================================================
      DELETE PATIENT
  ====================================================== */

  const deletePatient = async (id) => {

    try {

      await axios.delete(
        `${API}/${id}`
      );

      fetchPatients();

    } catch (err) {

      console.log(err);

      alert("Delete failed");
    }
  };

  /* ======================================================
      CALL PATIENT
  ====================================================== */

  const callPatient = async (patient) => {

    try {

      setCalling(patient.id);

      console.log(
        "PATIENT:",
        patient
      );

      /* =========================================
          VALIDATE PHONE
      ========================================= */

      if (!patient.phone) {

        alert(
          "Patient phone number missing"
        );

        return;
      }

      if (
        !String(patient.phone).startsWith("+")
      ) {

        alert(
          "Phone number must include country code.\nExample: +919392932907"
        );

        return;
      }

      /* =========================================
          PAYLOAD
      ========================================= */

      const payload = {

        phone: String(
          patient.phone
        ).trim(),

        name: String(
          patient.name
        ).trim(),

        doctor:
          "Dr. Sarah Johnson"
      };

      console.log(
        "PAYLOAD:",
        payload
      );

      /* =========================================
          API CALL
      ========================================= */

      const response =
        await axios.post(

          TWILIO_API,

          payload,

          {
            headers: {
              "Content-Type":
                "application/json"
            }
          }
        );

      console.log(
        "TWILIO RESPONSE:",
        response.data
      );

      /* =========================================
          SUCCESS
      ========================================= */

      if (response.data.success) {

        alert(
          `📞 Calling ${patient.name}...`
        );

      } else {

        alert(
          response.data.error ||
          "Call failed"
        );
      }

    } catch (error) {

      console.log(
        "FULL ERROR:",
        error
      );

      console.log(
        "ERROR RESPONSE:",
        error.response?.data
      );

      if (
        error.response?.data?.detail
      ) {

        alert(
          JSON.stringify(
            error.response.data.detail
          )
        );

      } else if (
        error.response?.data?.error
      ) {

        alert(
          error.response.data.error
        );

      } else {

        alert(
          "Backend/Twilio call failed"
        );
      }

    } finally {

      setCalling("");
    }
  };

  /* ======================================================
      UI
  ====================================================== */

  return (

    <div className="patients-page">

      {/* HEADER */}

      <div className="patients-header">

        <div>

          <h1>
            Patients Management
          </h1>

          <p className="sub-text">

            AI-powered healthcare
            monitoring dashboard.

          </p>

        </div>

        <button
          className="add-btn"
          onClick={() =>
            setShowAddModal(true)
          }
        >

          <FaPlus />

          Add Patient

        </button>

      </div>

      {/* SEARCH + FILTER */}

      <div className="toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            placeholder="Search patient..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <div className="filters">

          <button
            className={
              filter === "all"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("all")
            }
          >
            All
          </button>

          <button
            className={
              filter === "stable"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("stable")
            }
          >
            Stable
          </button>

          <button
            className={
              filter === "critical"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter("critical")
            }
          >
            Critical
          </button>

        </div>

      </div>

      {/* TABLE */}

      <div className="table-container">

        {loading ? (

          <div className="loading">

            <FaSyncAlt className="spin" />

            <h2>
              Loading Patients...
            </h2>

          </div>

        ) : (

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Patient</th>
                <th>Diagnosis</th>
                <th>Phone</th>
                <th>Score</th>
                <th>Status</th>
                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {
                filteredPatients.map(
                  (p) => (

                    <tr key={p.id}>

                      <td>
                        {p.id}
                      </td>

                      <td>

                        <div className="patient-info">

                          <div className="avatar">

                            <FaUserInjured />

                          </div>

                          <div>

                            <h4>
                              {p.name}
                            </h4>

                            <span>
                              Patient
                            </span>

                          </div>

                        </div>

                      </td>

                      <td>

                        <div className="diagnosis">

                          <FaNotesMedical />

                          {p.diagnosis}

                        </div>

                      </td>

                      <td>
                        {p.phone}
                      </td>

                      <td>

                        <div className="score">

                          <FaHeartbeat />

                          {p.score}

                        </div>

                      </td>

                      <td>

                        <span
                          className={`status ${
                            p.score > 60
                              ? "stable"
                              : "critical"
                          }`}
                        >

                          {p.status}

                        </span>

                      </td>

                      <td>

                        <div className="actions">

                          <button
                            className="call-btn"
                            onClick={() =>
                              callPatient(p)
                            }
                            disabled={
                              calling === p.id
                            }
                          >

                            <FaPhoneAlt />

                            {
                              calling === p.id
                                ? "Calling..."
                                : "Call"
                            }

                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deletePatient(
                                p.id
                              )
                            }
                          >

                            <FaTrash />

                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )
              }

            </tbody>

          </table>

        )}

      </div>

      {/* ADD MODAL */}

      {showAddModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>
              Add New Patient
            </h2>

            <input
              placeholder="Patient Name"
              value={newPatient.name}
              onChange={(e) =>
                setNewPatient({
                  ...newPatient,
                  name: e.target.value
                })
              }
            />

            <input
              placeholder="Diagnosis"
              value={
                newPatient.diagnosis
              }
              onChange={(e) =>
                setNewPatient({
                  ...newPatient,
                  diagnosis:
                    e.target.value
                })
              }
            />

            <input
              placeholder="+919392932907"
              value={newPatient.phone}
              onChange={(e) =>
                setNewPatient({
                  ...newPatient,
                  phone:
                    e.target.value
                })
              }
            />

            <input
              type="number"
              placeholder="Health Score"
              value={newPatient.score}
              onChange={(e) =>
                setNewPatient({
                  ...newPatient,
                  score:
                    e.target.value
                })
              }
            />

            <div className="modal-actions">

              <button
                className="save-btn"
                onClick={addPatient}
              >

                Save Patient

              </button>

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowAddModal(false)
                }
              >

                Cancel

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}