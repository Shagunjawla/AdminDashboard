import React, { useState } from "react";
import {
  FaUniversity,
  FaUserGraduate,
  FaTrophy,
  FaStar,
  FaAward,
  FaCalendar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Card Component
function Card({ title, icon, onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        transform: hover ? "scale(1.05)" : "scale(1)",
        boxShadow: hover
          ? "0 10px 25px rgba(255, 215, 0, 0.4)"
          : "0 5px 15px rgba(0,0,0,0.5)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}   // 👉 IMPORTANT
    >
      <div style={styles.icon}>{icon}</div>
      <h3>{title}</h3>
    </div>
  );
}

// Main Dashboard
function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>TechMNHub</h2>

        <p style={styles.menu} onClick={() => navigate("/")}>
          Dashboard
        </p>
        <p style={styles.menu} onClick={() => navigate("/students")}>
          Students
        </p>
        <p style={styles.menu} onClick={() => navigate("/institutes")}>
          Institutes
        </p>
        <p style={styles.menu} onClick={() => navigate("/ranking")}>
          Ranking
        </p>
        <p style={styles.menu} onClick={() => navigate("/points")}>
          Points
        </p>
        <p style={styles.menu} onClick={() => navigate("/badges")}>
          Badges
        </p>
        <p style={styles.menu} onClick={() => navigate("/events")}>
          Events
        </p>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <h1 style={styles.heading}>Admin Dashboard</h1>

        <div style={styles.grid}>
          <Card
            title="Manage Institutes"
            icon={<FaUniversity />}
            onClick={() => navigate("/institutes")}
          />
          <Card
            title="Manage Students"
            icon={<FaUserGraduate />}
            onClick={() => navigate("/students")}
          />
          <Card
            title="Ranking System"
            icon={<FaTrophy />}
            onClick={() => navigate("/ranking")}
          />
          <Card
            title="Points System"
            icon={<FaStar />}
            onClick={() => navigate("/points")}
          />
          <Card
            title="Badge Categories"
            icon={<FaAward />}
            onClick={() => navigate("/badges")}
          />
          <Card
            title="Events & Cells"
            icon={<FaCalendar />}
            onClick={() => navigate("/events")}
          />
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    display: "flex",
    fontFamily: "Arial",
    background: "#000",
    color: "#FFD700",
    minHeight: "100vh",
  },
  sidebar: {
    width: "220px",
    background: "linear-gradient(180deg, #000, #1a1a1a)",
    padding: "20px",
  },
  logo: {
    marginBottom: "30px",
    color: "#FFD700",
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
    background: "rgba(0,0,0,0.8)",
    border: "1px solid #FFD700",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.3s",
  },
  icon: {
    fontSize: "30px",
    marginBottom: "10px",
    color: "#FFD700",
  },
};

export default Dashboard;