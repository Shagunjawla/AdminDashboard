import React from "react";
import { FaUniversity, FaUserGraduate, FaTrophy, FaStar, FaAward, FaCalendar } from "react-icons/fa";

function Card({ title, icon }) {
  return (
    <div style={styles.card}>
      <div style={styles.icon}>{icon}</div>
      <h3>{title}</h3>
    </div>
  );
}

function App() {
  return (
    <div style={styles.container}>
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>TechMNHub</h2>
        <p style={styles.menu}>Dashboard</p>
        <p style={styles.menu}>Users</p>
        <p style={styles.menu}>Certificates</p>
        <p style={styles.menu}>Settings</p>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <h1 style={styles.heading}>Admin Dashboard</h1>

        <div style={styles.grid}>
          <Card title="Manage Institutes" icon={<FaUniversity />} />
          <Card title="Manage Students" icon={<FaUserGraduate />} />
          <Card title="Ranking System" icon={<FaTrophy />} />
          <Card title="Points System" icon={<FaStar />} />
          <Card title="Badge Categories" icon={<FaAward />} />
          <Card title="Events & Cells" icon={<FaCalendar />} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    fontFamily: "Arial",
    background: "#0f172a",
    color: "white",
    minHeight: "100vh",
  },

  sidebar: {
    width: "220px",
    background: "linear-gradient(180deg, #1e293b, #0f172a)",
    padding: "20px",
    boxShadow: "2px 0 10px rgba(0,0,0,0.5)",
  },

  logo: {
    marginBottom: "30px",
    color: "#38bdf8",
  },

  menu: {
    margin: "15px 0",
    cursor: "pointer",
    transition: "0.3s",
  },

  main: {
    flex: 1,
    padding: "20px",
  },

  heading: {
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "rgba(30, 41, 59, 0.7)",
    backdropFilter: "blur(10px)",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    transition: "0.3s",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },

  icon: {
    fontSize: "30px",
    marginBottom: "10px",
    color: "#38bdf8",
  },
};

// Hover Effect (important)
styles.card[":hover"] = {
  transform: "scale(1.05)",
};

export default App;