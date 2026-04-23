import React from "react";
import Card from "./Card";

function Dashboard() {
  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>

      <div style={styles.grid}>
        <Card title="Manage Institutes" />
        <Card title="Manage Students" />
        <Card title="Ranking System" />
        <Card title="Points System" />
        <Card title="Badge Categories" />
        <Card title="Events & Cells" />
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "20px"
  }
};

export default Dashboard;
