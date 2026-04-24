<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import ManageStudents from "./pages/ManageStudents";
import ManageInstitutes from "./pages/ManageInstitutes";
import ManageRanking from "./pages/ManageRanking";
import ManagePoints from "./pages/ManagePoints";
import ManageBadges from "./pages/ManageBadges";
import ManageEvents from "./pages/ManageEvents";
=======
import React, { useState } from "react";
import { FaUniversity, FaUserGraduate, FaTrophy, FaStar, FaAward, FaCalendar } from "react-icons/fa";

function Card({ title, icon }) {
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
    >
      <div style={styles.icon}>{icon}</div>
      <h3>{title}</h3>
    </div>
  );
}
>>>>>>> dbff0c38120bac182350cb5afd3f055196deeedd

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/students" element={<ManageStudents />} />
        <Route path="/institutes" element={<ManageInstitutes />} />
        <Route path="/ranking" element={<ManageRanking />} />
        <Route path="/points" element={<ManagePoints />} />
        <Route path="/badges" element={<ManageBadges />} />
        <Route path="/events" element={<ManageEvents />} />
      </Routes>
    </Router>
  );
}

<<<<<<< HEAD
export default App;
=======
const styles = {
  container: {
    display: "flex",
    fontFamily: "Arial",
    background: "#000000", // Black background
    color: "#FFD700", // Golden text
    minHeight: "100vh",
  },

  sidebar: {
    width: "220px",
    background: "linear-gradient(180deg, #000000, #1a1a1a)",
    padding: "20px",
    boxShadow: "2px 0 10px rgba(255,215,0,0.2)",
  },

  logo: {
    marginBottom: "30px",
    color: "#FFD700",
  },

  menu: {
    margin: "15px 0",
    cursor: "pointer",
    color: "#e6c200",
    transition: "0.3s",
  },

  main: {
    flex: 1,
    padding: "20px",
  },

  heading: {
    marginBottom: "20px",
    color: "#FFD700",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "rgba(0, 0, 0, 0.8)",
    border: "1px solid #FFD700",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    transition: "0.3s",
    cursor: "pointer",
  },

  icon: {
    fontSize: "30px",
    marginBottom: "10px",
    color: "#FFD700",
  },
};

export default App;
>>>>>>> dbff0c38120bac182350cb5afd3f055196deeedd
