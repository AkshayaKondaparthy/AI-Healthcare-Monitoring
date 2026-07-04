import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaStethoscope } from "react-icons/fa";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Patients", path: "/patients" },
    { name: "Live", path: "/live" },
    { name: "Workflow", path: "/workflow" },
    { name: "Logs", path: "/logs" }
  ];

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>🤖 AI Care</h2>

        <ul>
          {menuItems.map((item, i) => (
            <li
              key={i}
              className={location.pathname === item.path ? "active" : ""}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* MAIN AREA */}
      <div className="main">

        {/* NAVBAR (NOW GLOBAL) */}
        <div className="navbar">
          <div className="navLeft">
            <FaStethoscope />
            <h3>MediAI</h3>
          </div>

          <div className="navCenter">
            {menuItems.map((item, i) => (
              <div
                key={i}
                className={`navLink ${location.pathname === item.path ? "active" : ""}`}
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </div>
            ))}
          </div>

          <div className="navRight">
            <div className="liveDot"></div>
            Live System
          </div>
        </div>

        {/* PAGE CONTENT RENDERS HERE */}
        <Outlet />

      </div>
    </div>
  );
}