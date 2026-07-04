import React from "react";

import {
  Outlet,
  useNavigate,
  useLocation
} from "react-router-dom";

import {

  FaTachometerAlt,
  FaUserInjured,
  FaHeartbeat,
  FaProjectDiagram,
  FaClipboardList,
  FaBolt,
  FaBell,
  FaStethoscope,
  FaUserCircle,
  FaSignOutAlt,
  FaVideo,
  FaRobot,
  FaCircle

} from "react-icons/fa";

import "../styles/layout.css";
import "../styles/Sidebar.css";
import "../styles/navbar.css";

export default function MainLayout() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  /* ======================================================
      MENU ITEMS
  ====================================================== */

  const menuItems = [

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

  /* ======================================================
      LOGOUT
  ====================================================== */

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    window.location.href =
      "/login";
  };

  /* ======================================================
      UI
  ====================================================== */

  return (

    <div className="appLayout">

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <aside className="sidebar">

        {/* LOGO */}

        <div className="sidebarLogo">

          <div className="logoIcon">

            <FaRobot />

          </div>

          <div>

            <h2>
              PulseGuard AI
            </h2>

            <p>
              Smart Healthcare
            </p>

          </div>

        </div>

        {/* TITLE */}

        <div className="sidebarTitle">

          MAIN MENU

        </div>

        {/* LINKS */}

        <div className="sidebarLinks">

          {

            menuItems.map((item, index) => (

              <div
                key={index}
                onClick={() =>
                  navigate(item.path)
                }
                className={`sidebarItem ${
                  location.pathname === item.path
                    ? "active"
                    : ""
                }`}
              >

                <div className="sidebarIcon">

                  {item.icon}

                </div>

                <span>
                  {item.name}
                </span>

              </div>
            ))
          }

        </div>

        {/* FOOTER */}

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

        </div>

      </aside>

      {/* ======================================================
          MAIN SECTION
      ====================================================== */}

      <div className="mainSection">

        {/* ======================================================
            NAVBAR
        ====================================================== */}

        <nav className="navbar">

          {/* LEFT */}

          <div className="navLeft">

            <FaStethoscope className="navLogoIcon" />

            <div>

              <h3>
                PulseGuard AI
              </h3>

              <p>
                Intelligent Healthcare System
              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div className="navRight">

            {/* NOTIFICATION */}

            <div className="iconBtn">

              <FaBell />

              <span className="badge">

                3

              </span>

            </div>

            {/* STATUS */}

            <div className="status">

              <div className="liveDot" />

              <span>
                System Active
              </span>

            </div>

            {/* USER */}

            <div className="userProfile">

              <FaUserCircle className="userIcon" />

              <button
                className="logoutBtn"
                onClick={logout}
              >

                <FaSignOutAlt />

                <span>
                  Logout
                </span>

              </button>

            </div>

          </div>

        </nav>

        {/* ======================================================
            PAGE CONTENT
        ====================================================== */}

        <main className="pageContent">

          <Outlet />

        </main>

      </div>

    </div>
  );
}