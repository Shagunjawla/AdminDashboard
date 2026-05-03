import React, { useState } from "react";
import {
  FaUniversity,
  FaUserGraduate,
  FaTrophy,
  FaStar,
  FaAward,
  FaCalendar,
  FaBars,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// 🔥 Card Component
function Card({ title, icon, onClick }) {
  return (
    <div style={styles.card} className="hover-card" onClick={onClick}>
      <div style={styles.icon}>{icon}</div>
      <h3>{title}</h3>
    </div>
  );
}

// 🔥 Dashboard
function Dashboard() {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Students", path: "/students" },
    { name: "Institutes", path: "/institutes" },
    { name: "Ranking", path: "/ranking" },
    { name: "Points", path: "/points" },
    { name: "Badges", path: "/badges" },
    { name: "Events", path: "/events" },
  ];

  return (
    <div style={styles.container}>
      {/* 🔥 Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>TechMNHub</h2>

        {menuItems.map((item, i) => (
          <p
            key={i}
            style={styles.menu}
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </p>
        ))}
      </div>

      {/* 🔥 Main */}
      <div style={styles.main}>
        {/* 🔥 Navbar */}
        <div style={styles.navbar}>
          <FaBars />
          <h3 style={{ color: "gold" }}>Admin Dashboard</h3>

          <div style={styles.navRight}>
            <FaBell />
            <FaUserCircle size={26} />
          </div>
        </div>

        {/* 🔥 Heading */}
        <h1 style={styles.heading}>Welcome to TechMNHub </h1>

        {/* 🔥 Cards */}
        <div style={styles.grid}>
          <Card title="Manage Institutes" icon={<FaUniversity />} onClick={() => navigate("/institutes")} />
          <Card title="Manage Students" icon={<FaUserGraduate />} onClick={() => navigate("/students")} />
          <Card title="Ranking System" icon={<FaTrophy />} onClick={() => navigate("/ranking")} />
          <Card title="Points System" icon={<FaStar />} onClick={() => navigate("/points")} />
          <Card title="Badge Categories" icon={<FaAward />} onClick={() => navigate("/badges")} />
          <Card title="Events & Cells" icon={<FaCalendar />} onClick={() => navigate("/events")} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;



// 🎨 PROFESSIONAL STYLES
const styles = {
  container: {
    display: "flex",
    fontFamily: "Segoe UI",
    background: "linear-gradient(135deg, #020617, #0f172a)",
    minHeight: "100vh",
    color: "#fff",
  },

  sidebar: {
    width: "240px",
    background: "linear-gradient(180deg, #020617, #020617, #0f172a)",
    padding: "20px",
    borderRight: "1px solid rgba(255,215,0,0.2)",
  },

  logo: {
    color: "gold",
    marginBottom: "30px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },

  menu: {
    padding: "12px",
    margin: "8px 0",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },

  main: {
    flex: 1,
    padding: "20px 30px",
  },

  navbar: {
    height: "60px",
    background: "rgba(2,6,23,0.7)",
    backdropFilter: "blur(10px)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    marginBottom: "20px",
  },

  navRight: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },

  heading: {
    color: "#facc15",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "rgba(30,41,59,0.6)",
    backdropFilter: "blur(12px)",
    padding: "25px",
    borderRadius: "14px",
    textAlign: "center",
    border: "1px solid rgba(255,215,0,0.2)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  icon: {
    fontSize: "30px",
    marginBottom: "10px",
    color: "#facc15",
  },
};