import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#0b5ed7", color: "white" }}>
      <Link to="/" style={{ margin: "10px", color: "white" }}>Dashboard</Link>
      <Link to="/patients" style={{ margin: "10px", color: "white" }}>Patients</Link>
      <Link to="/live" style={{ margin: "10px", color: "white" }}>Live</Link>
      <Link to="/workflow" style={{ margin: "10px", color: "white" }}>Workflow</Link>
      <Link to="/logs" style={{ margin: "10px", color: "white" }}>Logs</Link>
    </nav>
  );
}