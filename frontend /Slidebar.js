import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const nav = useNavigate();

  return (
    <div style={styles.sidebar}>
      <h2>Admin Panel</h2>

      <button onClick={() => nav("/dashboard")}>Dashboard</button>
      <button onClick={() => nav("/users")}>Users</button>
      <button onClick={() => nav("/")}>Logout</button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    height: "100vh",
    background: "#1e293b",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }
};
