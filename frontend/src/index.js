import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

/* ================= GLOBAL STYLES ================= */

import "./styles/global.css";

/* ================= ROOT ================= */

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

/* ================= RENDER ================= */

root.render(

  <React.StrictMode>

    <App />

  </React.StrictMode>
);