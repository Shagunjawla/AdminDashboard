import React from "react";

function Dashboard() {
  return (
    <div style={styles.container}>

      <h1>Admin Dashboard</h1>

      <div style={styles.grid}>
        <Card title="Manage Institutes" />
        <Card title="Manage Students" />
        <Card title="Control Ranking System" />
        <Card title="Define Points System" />
        <Card title="Create Badge Categories" />
        <Card title="Manage Events & Cells" />
      </div>

    </div>
  );
}

function Card({ title }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#0f2027",
    color: "white",
    minHeight: "100vh"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px"
  },
  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    transition: "0.3s",
    cursor: "pointer"
  }
};

export default Dashboard;