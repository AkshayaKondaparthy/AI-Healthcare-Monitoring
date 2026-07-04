import React,{
  useEffect,
  useState
} from "react";

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
  FaUserCircle
} from "react-icons/fa";

import "./navbar.css";

export default function Navbar() {

  const location = useLocation();

  const [patients,setPatients] = useState([]);

  /* ================= LOAD PATIENTS ================= */

  useEffect(() => {

    const loadPatients = () => {

      const storedPatients = JSON.parse(
        localStorage.getItem("patients")
      ) || [];

      setPatients(storedPatients);
    };

    loadPatients();

    const interval = setInterval(
      loadPatients,
      1000
    );

    return () => clearInterval(interval);

  }, []);

  /* ================= NAV LINKS ================= */

  const links = [

    {
      name:"Dashboard",
      path:"/",
      icon:<FaTachometerAlt />
    },

    {
      name:"Patients",
      path:"/patients",
      icon:<FaUserInjured />
    },

    {
      name:"Live",
      path:"/live",
      icon:<FaHeartbeat />
    },

    {
      name:"Workflow",
      path:"/workflow",
      icon:<FaProjectDiagram />
    },

    {
      name:"Trigger",
      path:"/trigger",
      icon:<FaBolt />
    },

    {
      name:"Logs",
      path:"/logs",
      icon:<FaClipboardList />
    }

  ];

  return (

    <nav className="navbar">

      {/* ================= LEFT ================= */}

      <div className="navLeft">

        <div className="logo">

          <div className="logoDot" />

          <span>
            AI Patient Agent
          </span>

        </div>

      </div>

      {/* ================= CENTER ================= */}

      <div className="navLinks">

        {links.map((link,index)=>(

          <Link
            key={index}
            to={link.path}
            className={`navItem ${
              location.pathname === link.path
                ? "active"
                : ""
            }`}
          >

            <span className="icon">
              {link.icon}
            </span>

            <span>
              {link.name}
            </span>

          </Link>

        ))}

      </div>

      {/* ================= RIGHT ================= */}

      <div className="navRight">

        <div className="status">

          <div className="dot" />

          <span>
            {patients.length} Patients Live
          </span>

        </div>

        <div className="user">

          <FaUserCircle className="userIcon" />

          <div>

            <h4>
              Admin
            </h4>

            <p>
              Healthcare AI
            </p>

          </div>

        </div>

      </div>

    </nav>
  );
}