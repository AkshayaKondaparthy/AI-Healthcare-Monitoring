import React from "react";

import {
  Outlet,
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  FaHome,
  FaUser,
  FaFileMedical,
  FaPills,
  FaSignOutAlt,
  FaHeartbeat
} from "react-icons/fa";

export default function PatientLayout() {

  const location = useLocation();

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/login");
  };

  const navItems = [

    {
      name: "Dashboard",
      path: "/patient-dashboard",
      icon: <FaHome />
    },

    {
      name: "Profile",
      path: "/patient-profile",
      icon: <FaUser />
    },

    {
      name: "Reports",
      path: "/patient-reports",
      icon: <FaFileMedical />
    },

    {
      name: "Medications",
      path: "/patient-medications",
      icon: <FaPills />
    }
  ];

  return (

    <div style={styles.container}>

      {/* SIDEBAR */}

      <div style={styles.sidebar}>

        <div>

          {/* LOGO */}

          <div style={styles.logoSection}>

            <div style={styles.logoBox}>
              <FaHeartbeat color="#22c55e" size={26} />
            </div>

            <div>

              <h2 style={styles.logoTitle}>
                Patient Portal
              </h2>

              <p style={styles.logoSub}>
                AI Healthcare
              </p>

            </div>

          </div>

          {/* NAVIGATION */}

          <div style={styles.navContainer}>

            {
              navItems.map((item) => (

                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    ...styles.navItem,

                    ...(location.pathname === item.path
                      ? styles.activeNav
                      : {})
                  }}
                >

                  {item.icon}

                  {item.name}

                </Link>
              ))
            }

          </div>

        </div>

        {/* LOGOUT */}

        <button
          style={styles.logoutButton}
          onClick={logout}
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

      {/* PAGE CONTENT */}

      <div style={styles.content}>

        <Outlet />

      </div>

    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#020617",
    fontFamily: "Inter, sans-serif"
  },

  sidebar: {
    width: "280px",
    background: "#0f172a",
    borderRight: "1px solid #1e293b",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },

  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "50px"
  },

  logoBox: {
    width: "60px",
    height: "60px",
    borderRadius: "18px",
    background: "rgba(34,197,94,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  logoTitle: {
    color: "white",
    fontSize: "22px",
    fontWeight: "800"
  },

  logoSub: {
    color: "#94a3b8",
    fontSize: "13px"
  },

  navContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  navItem: {
    padding: "16px",
    borderRadius: "14px",
    color: "#cbd5e1",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontWeight: "600",
    transition: "0.3s"
  },

  activeNav: {
    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",
    color: "white"
  },

  content: {
    flex: 1,
    padding: "35px",
    overflowY: "auto"
  },

  logoutButton: {
    border: "none",
    background: "#ef4444",
    color: "white",
    padding: "14px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
  }
};