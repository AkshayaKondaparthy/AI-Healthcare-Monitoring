import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "../styles/logs.css";

export default function Logs() {

  /* ================= STATES ================= */

  const [logs, setLogs] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [socketStatus, setSocketStatus] = useState("Connecting...");

  const API = "http://127.0.0.1:8000";

  /* ================= FETCH LOGS ================= */

  const fetchLogs = async () => {
    try {
      const res = await axios.get(`${API}/logs`);
      setLogs(res.data.logs || []);
      setSocketStatus("Live");
    } catch (err) {
      console.log(err);
      setSocketStatus("Disconnected");
    }
  };

  /* ================= FETCH FOLLOWUPS ================= */

  const fetchFollowUps = async () => {
    try {
      const res = await axios.get(`${API}/followups`);
      setFollowUps(res.data.followups || []);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= LOAD + AUTO REFRESH ================= */

  useEffect(() => {
    fetchLogs();
    fetchFollowUps();

    const interval = setInterval(() => {
      fetchLogs();
      fetchFollowUps();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* ================= MARK FOLLOWUP COMPLETE ================= */

  const markCompleted = async (id) => {
    try {
      await axios.post(`${API}/complete-followup/${id}`);
      fetchFollowUps();
      fetchLogs(); // refresh logs after action
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= FILTER LOGS ================= */

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {

      const searchMatch =
        log.patient?.toLowerCase().includes(search.toLowerCase()) ||
        log.action?.toLowerCase().includes(search.toLowerCase());

      const filterMatch =
        filter === "all" ||
        log.risk?.toLowerCase() === filter;

      return searchMatch && filterMatch;
    });
  }, [logs, search, filter]);

  /* ================= COUNTS ================= */

  const stableCount = logs.filter(l => l.risk === "Stable").length;
  const moderateCount = logs.filter(l => l.risk === "Moderate").length;
  const criticalCount = logs.filter(l => l.risk === "Critical").length;

  /* ================= UI ================= */

  return (
    <div className="logsPage">

      {/* HEADER */}
      <div className="logsHeader">

        <div>
          <h1>📊 AI Logs & Follow-ups</h1>
          <p>Real-time patient monitoring system</p>
        </div>

        <div className={`logsStatus ${socketStatus.toLowerCase()}`}>
          {socketStatus}
        </div>

      </div>

      {/* STATS */}
      <div className="logsStats">

        <div className="logCard blue">
          <h3>Total Logs</h3>
          <h2>{logs.length}</h2>
        </div>

        <div className="logCard green">
          <h3>Stable</h3>
          <h2>{stableCount}</h2>
        </div>

        <div className="logCard yellow">
          <h3>Moderate</h3>
          <h2>{moderateCount}</h2>
        </div>

        <div className="logCard red">
          <h3>Critical</h3>
          <h2>{criticalCount}</h2>
        </div>

      </div>

      {/* FOLLOWUPS */}
      <div className="followupBox">

        <h3>⏳ Follow-ups</h3>

        {followUps.length === 0 ? (
          <p className="emptyText">No follow-ups scheduled</p>
        ) : (
          followUps.map((f) => (
            <div key={f.id} className="logItem">

              <div>
                <h4>{f.patient}</h4>
                <p>{f.time}</p>
              </div>

              <div className={`logBadge ${f.status}`}>
                {f.status}
              </div>

              {f.status === "scheduled" && (
                <button
                  className="resolveBtn"
                  onClick={() => markCompleted(f.id)}
                >
                  Mark Completed
                </button>
              )}

            </div>
          ))
        )}

      </div>

      {/* FILTERS */}
      <div className="logsFilters">

        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("stable")}>Stable</button>
        <button onClick={() => setFilter("moderate")}>Moderate</button>
        <button onClick={() => setFilter("critical")}>Critical</button>

      </div>

      {/* LOG LIST */}
      <div className="logsList">

        {filteredLogs.length > 0 ? (

          filteredLogs.map((log) => (
            <div key={log.id} className="logItem">

              <div>
                <h4>{log.patient}</h4>
                <p>{log.action}</p>
                <small>{log.time}</small>
              </div>

              <div className={`logBadge ${log.risk?.toLowerCase()}`}>
                {log.risk}
              </div>

            </div>
          ))

        ) : (
          <div className="noLogs">
            No logs found
          </div>
        )}

      </div>

    </div>
  );
}