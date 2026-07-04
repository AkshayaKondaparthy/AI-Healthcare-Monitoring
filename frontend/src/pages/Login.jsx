import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUserMd,
  FaUserInjured,
  FaLock,
  FaEnvelope,
  FaHeartbeat,
  FaArrowRight,
  FaUserPlus
} from "react-icons/fa";

import "../styles/auth.css";

export default function Login() {

  const navigate = useNavigate();

  const [mode, setMode] =
    useState("signin");

  const [role, setRole] =
    useState("doctor");

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({

      name: "",

      email: "",

      password: ""
    });

  /* =====================================================
      HANDLE CHANGE
  ===================================================== */

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value
    });
  };

  /* =====================================================
      SIGN UP
  ===================================================== */

  const handleSignup =
    async () => {

      if (
        !form.name ||
        !form.email ||
        !form.password
      ) {

        alert("Please fill all fields");

        return;
      }

      try {

        setLoading(true);

        const endpoint =

          role === "doctor"

            ? "http://127.0.0.1:8000/auth/doctor/signup"

            : "http://127.0.0.1:8000/auth/patient/signup";

        const response =
          await fetch(
            endpoint,
            {
              method: "POST",

              headers: {

                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                username:
                  form.email,

                password:
                  form.password
              })
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          alert(
            data.detail ||
            "Signup failed"
          );

          return;
        }

        alert(
          "Account Created Successfully"
        );

        setMode("signin");

        setForm({

          name: "",

          email: "",

          password: ""
        });

      } catch (err) {

        console.log(err);

        alert(
          "Backend connection failed"
        );

      } finally {

        setLoading(false);
      }
    };

  /* =====================================================
      SIGN IN
  ===================================================== */

  const handleSignin =
    async () => {

      if (
        !form.email ||
        !form.password
      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      try {

        setLoading(true);

        const endpoint =

          role === "doctor"

            ? "http://127.0.0.1:8000/auth/doctor/login"

            : "http://127.0.0.1:8000/auth/patient/login";

        const response =
          await fetch(
            endpoint,
            {
              method: "POST",

              headers: {

                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                username:
                  form.email,

                password:
                  form.password
              })
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          alert(
            data.detail ||
            "Login failed"
          );

          return;
        }

        localStorage.setItem(
          "token",
          data.access_token
        );

        localStorage.setItem(
          "role",
          data.role
        );

        alert(
          "Login Successful"
        );

        navigate(

          data.role ===
          "doctor"

            ? "/dashboard"

            : "/patient-dashboard"
        );

      } catch (err) {

        console.log(err);

        alert(
          "Backend connection failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="auth-page">

      {/* LEFT */}

      <div className="auth-left">

        <div className="overlay"></div>

        <div className="auth-content">

          <div className="logo-box">

            <FaHeartbeat />

          </div>

          <h1>
            AI Healthcare
            <br />
            Monitoring System
          </h1>

          <p>

            Smart patient monitoring,
            AI-powered healthcare analytics,
            live consultations,
            and predictive alerts.

          </p>

          <div className="feature-grid">

            <div className="feature-card">

              <FaHeartbeat />

              <span>
                Real-time Monitoring
              </span>

            </div>

            <div className="feature-card">

              <FaUserMd />

              <span>
                Doctor Dashboard
              </span>

            </div>

            <div className="feature-card">

              <FaUserInjured />

              <span>
                Patient Portal
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="auth-right">

        <div className="auth-card">

          <div className="top-icon">

            {

              role === "doctor"

                ? <FaUserMd />

                : <FaUserInjured />
            }

          </div>

          <h2>

            {

              mode === "signin"

                ? "Welcome Back"

                : "Create Account"
            }

          </h2>

          <p className="subtext">

            {

              mode === "signin"

                ? "Login to continue"

                : "Register new account"
            }

          </p>

          {/* ROLE */}

          <div className="role-switch">

            <button

              className={
                role === "doctor"
                  ? "active"
                  : ""
              }

              onClick={() =>
                setRole("doctor")
              }
            >

              <FaUserMd />

              Doctor

            </button>

            <button

              className={
                role === "patient"
                  ? "active"
                  : ""
              }

              onClick={() =>
                setRole("patient")
              }
            >

              <FaUserInjured />

              Patient

            </button>

          </div>

          {/* NAME */}

          {

            mode === "signup" && (

              <div className="input-box">

                <FaUserPlus />

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={
                    handleChange
                  }
                />

              </div>
            )
          }

          {/* EMAIL */}

          <div className="input-box">

            <FaEnvelope />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={
                handleChange
              }
            />

          </div>

          {/* PASSWORD */}

          <div className="input-box">

            <FaLock />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={
                handleChange
              }
            />

          </div>

          {/* BUTTON */}

          <button
            className="auth-btn"
            onClick={

              mode === "signin"

                ? handleSignin

                : handleSignup
            }
          >

            {

              loading

                ? "Please Wait..."

                : (

                    mode === "signin"

                      ? "Sign In"

                      : "Create Account"
                  )
            }

            <FaArrowRight />

          </button>

          {/* TOGGLE */}

          <div className="bottom-text">

            {

              mode === "signin"

                ? (
                  <>
                    Don't have account?

                    <span
                      onClick={() =>
                        setMode("signup")
                      }
                    >
                      Sign Up
                    </span>
                  </>
                )

                : (
                  <>
                    Already have account?

                    <span
                      onClick={() =>
                        setMode("signin")
                      }
                    >
                      Sign In
                    </span>
                  </>
                )
            }

          </div>

        </div>

      </div>

    </div>
  );
}