import React from "react";

function Card({ ManageStudents }) {
  return (
    <div style={styles.card}>
      <h3>{ManageStudents}</h3>
    </div>
  );
}

const styles = {
  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "12px",
    color: "white",
    cursor: "pointer"
  }
};

export default Card;