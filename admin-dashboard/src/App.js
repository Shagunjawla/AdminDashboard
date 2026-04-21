import React from "react";

function Card({ title }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
    </div>
  );
}

function App() {
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

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    background: "#0f172a",
    minHeight: "100vh",
    color: "white"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "10px",
  },
};

export default App;