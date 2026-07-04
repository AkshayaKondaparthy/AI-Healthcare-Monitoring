import React from "react";

import {
  Link,
  useLocation
} from "react-router-dom";

import {

  FaTachometerAlt,
  FaUserInjured,
  FaHeartbeat,
  FaProjectDiagram,
  FaClipboardList,
  FaBolt,
  FaRobot,
  FaCircle,
  FaVideo,
  FaStethoscope

} from "react-icons/fa";

import "../styles/sidebar.css";

export default function Sidebar() {

  const location =
    useLocation();

  const links = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />
    },

    {
      name: "Patients",
      path: "/patients",
      icon: <FaUserInjured />
    },

    {
      name: "Live AI",
      path: "/live",
      icon: <FaHeartbeat />
    },

    {
      name: "Video Consultation",
      path: "/consultation",
      icon: <FaVideo />
    },

    {
      name: "Workflow",
      path: "/workflow",
      icon: <FaProjectDiagram />
    },

    {
      name: "Trigger",
      path: "/trigger",
      icon: <FaBolt />
    },

    {
      name: "Logs",
      path: "/logs",
      icon: <FaClipboardList />
    }

  ];

  return (

    <aside className="sidebar">

      {/* =======================================
          LOGO
      ======================================= */}

      <div className="sidebarLogo">

        <div className="logoIcon">

          <FaRobot />

        </div>

        <div>

          <h2>
            PulseGuard AI
          </h2>

          <p>
            Smart Healthcare Platform
          </p>

        </div>

      </div>

      {/* =======================================
          TITLE
      ======================================= */}

      <div className="sidebarTitle">

        MAIN MENU

      </div>

      {/* =======================================
          LINKS
      ======================================= */}

      <div className="sidebarLinks">

        {

          links.map((link, i) => (

            <Link
              key={i}
              to={link.path}
              className={`sidebarItem ${
                location.pathname === link.path
                  ? "active"
                  : ""
              }`}
            >

              <div className="sidebarIcon">

                {link.icon}

              </div>

              <span>
                {link.name}
              </span>

            </Link>
          ))
        }

      </div>

      {/* =======================================
          FOOTER
      ======================================= */}

      <div className="sidebarFooter">

        <div className="systemStatus">

          <FaCircle className="liveIcon" />

          <div>

            <h4>
              AI Monitoring Active
            </h4>

            <p>
              PulseGuard v3.0
            </p>

          </div>

        </div>

        <div className="doctor-status">

          <FaStethoscope />

          Doctor Consultation Ready

        </div>

      </div>

    </aside>
  );
}