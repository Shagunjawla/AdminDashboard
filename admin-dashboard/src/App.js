import React from "react";

function Dashboard() {
  return (
    <div style={styles.container}>
      
      {/* Sidebar */}
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

      {/* Main Content */}
      <div style={styles.main}>
        <h1 style={styles.heading}>Admin Dashboard</h1>

        <div style={styles.grid}>
          <Card title="Manage Institutes" desc="Add / Edit Institutes" />
          <Card title="Manage Students" desc="View & Control Students" />
          <Card title="Ranking System" desc="Control Rankings" />
          <Card title="Points System" desc="Define Points Logic" />
          <Card title="Badge Categories" desc="Create Badges" />
          <Card title="Events & Cells" desc="Manage Events" />
        </div>
      </div>

    </div>
  );
}

function Card({ title, desc }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p style={styles.cardText}>{desc}</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
    background: "#0f172a",
    color: "white"
  },

  sidebar: {
    width: "220px",
    background: "#020617",
    padding: "20px"
  },

  logo: {
    color: "#38bdf8",
    marginBottom: "30px"
  },

  menu: {
    listStyle: "none",
    padding: 0,
    lineHeight: "2.5",
    cursor: "pointer"
  },

  main: {
    flex: 1,
    padding: "30px"
  },

  heading: {
    marginBottom: "20px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    transition: "0.3s",
    cursor: "pointer"
  },

  cardText: {
    color: "#94a3b8",
    marginTop: "10px"
  }
};

export default Dashboard;