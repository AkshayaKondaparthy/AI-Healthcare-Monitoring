import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

/* ======================================================
   LAYOUTS
====================================================== */

import MainLayout from "./layout/MainLayout";
import PatientLayout from "./layout/PatientLayout";

/* ======================================================
   AUTH
====================================================== */

import Login from "./pages/Login";

/* ======================================================
   DOCTOR PAGES
====================================================== */

import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import LiveInteraction from "./pages/LiveInteraction";
import Workflow from "./pages/Workflow";
import TriggerForm from "./pages/TriggerForm";
import Logs from "./pages/Logs";
import VideoConsultation from "./pages/VideoConsultation";

/* ======================================================
   PATIENT PAGES
====================================================== */

import PatientDashboard from "./pages/PatientDashboard";
import PatientProfile from "./pages/PatientProfile";
import PatientReports from "./pages/PatientReports";
import PatientMedications from "./pages/PatientMedications";

/* ======================================================
   GLOBAL CSS
====================================================== */

import "./styles/global.css";

/* ======================================================
   AUTH HELPERS
====================================================== */

const getToken = () => {

  return localStorage.getItem(
    "token"
  );
};

const getRole = () => {

  return localStorage.getItem(
    "role"
  );
};

const isAuthenticated = () => {

  return !!getToken();
};

/* ======================================================
   PROTECTED ROUTE
====================================================== */

const ProtectedRoute = ({
  children,
  allowedRole
}) => {

  /* NOT LOGGED IN */

  if (!isAuthenticated()) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /* INVALID ROLE */

  if (
    allowedRole &&
    getRole() !== allowedRole
  ) {

    return (
      <Navigate
        to={
          getRole() === "doctor"

            ? "/dashboard"

            : "/patient-dashboard"
        }
        replace
      />
    );
  }

  return children;
};

/* ======================================================
   PUBLIC ROUTE
====================================================== */

const PublicRoute = ({
  children
}) => {

  if (isAuthenticated()) {

    return (
      <Navigate
        to={
          getRole() === "doctor"

            ? "/dashboard"

            : "/patient-dashboard"
        }
        replace
      />
    );
  }

  return children;
};

/* ======================================================
   APP
====================================================== */

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ======================================================
            ROOT REDIRECT
        ====================================================== */}

        <Route
          path="/"
          element={

            isAuthenticated()

              ? (

                  <Navigate
                    to={
                      getRole() === "doctor"

                        ? "/dashboard"

                        : "/patient-dashboard"
                    }
                    replace
                  />
                )

              : (

                  <Navigate
                    to="/login"
                    replace
                  />
                )
          }
        />

        {/* ======================================================
            LOGIN
        ====================================================== */}

        <Route
          path="/login"
          element={

            <PublicRoute>

              <Login />

            </PublicRoute>
          }
        />

        {/* ======================================================
            DOCTOR ROUTES
        ====================================================== */}

        <Route
          element={

            <ProtectedRoute
              allowedRole="doctor"
            >

              <MainLayout />

            </ProtectedRoute>
          }
        >

          {/* DASHBOARD */}

          <Route
            path="/dashboard"
            element={
              <Dashboard />
            }
          />

          {/* PATIENTS */}

          <Route
            path="/patients"
            element={
              <Patients />
            }
          />

          {/* LIVE AI */}

          <Route
            path="/live"
            element={
              <LiveInteraction />
            }
          />

          {/* VIDEO CONSULTATION */}

          <Route
            path="/consultation"
            element={
              <VideoConsultation />
            }
          />

          {/* WORKFLOW */}

          <Route
            path="/workflow"
            element={
              <Workflow />
            }
          />

          {/* TRIGGER */}

          <Route
            path="/trigger"
            element={
              <TriggerForm />
            }
          />

          {/* LOGS */}

          <Route
            path="/logs"
            element={
              <Logs />
            }
          />

        </Route>

        {/* ======================================================
            PATIENT ROUTES
        ====================================================== */}

        <Route
          element={

            <ProtectedRoute
              allowedRole="patient"
            >

              <PatientLayout />

            </ProtectedRoute>
          }
        >

          {/* PATIENT DASHBOARD */}

          <Route
            path="/patient-dashboard"
            element={
              <PatientDashboard />
            }
          />

          {/* PROFILE */}

          <Route
            path="/patient-profile"
            element={
              <PatientProfile />
            }
          />

          {/* REPORTS */}

          <Route
            path="/patient-reports"
            element={
              <PatientReports />
            }
          />

          {/* MEDICATIONS */}

          <Route
            path="/patient-medications"
            element={
              <PatientMedications />
            }
          />

          {/* LIVE INTERACTION */}

          <Route
            path="/patient-live"
            element={
              <LiveInteraction />
            }
          />

          {/* VIDEO CONSULTATION */}

          <Route
            path="/patient-consultation"
            element={
              <VideoConsultation />
            }
          />

        </Route>

        {/* ======================================================
            FALLBACK
        ====================================================== */}

        <Route
          path="*"
          element={

            <Navigate
              to={

                isAuthenticated()

                  ? (

                      getRole() === "doctor"

                        ? "/dashboard"

                        : "/patient-dashboard"
                    )

                  : "/login"
              }
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}