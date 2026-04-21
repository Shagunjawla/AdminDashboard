import React, { useEffect, useState } from "react";
import { getStats } from "./api";

function Dashboard() {

  const [stats, setStats] = useState({
    students: 0,
    institutes: 0,
    events: 0
  });

  useEffect(() => {
    getStats().then(res => setStats(res.data));
  }, []);

  return (
    <div style={styles.container}>
      
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>TechMNHub</h2>
        <ul style={styles.menu}>
          <li>Dashboard</li>
          <li>Institutes</li>
          <li>Students</li>
          <li>Ranking</li>
          <li>Points</li>
          <li>Events</li>
        </ul>
      </div>

      <div style={styles.main}>
        <h1>Admin Dashboard</h1>

        <div style={styles.grid}>
          <Card title="Total Students" desc={stats.students} />
          <Card title="Total Institutes" desc={stats.institutes} />
          <Card title="Total Events" desc={stats.events} />
        </div>
      </div>

    </div>
  );
}

function Card({ title, desc }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

const styles = {
  container: { display: "flex", height: "100vh", background: "#0f172a", color: "white" },
  sidebar: { width: "220px", background: "#020617", padding: "20px" },
  main: { flex: 1, padding: "30px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, 250px)", gap: "20px" },
  card: { background: "#1e293b", padding: "20px", borderRadius: "12px" }
};

export default Dashboard;