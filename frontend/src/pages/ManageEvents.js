import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const API = "http://localhost:5000/api/events";

function ManageEvents() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: "",
    eventName: "",
    date: "",
    time: "",
    location: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchData = () => {
    fetch(API)
      .then((res) => res.json())
      .then(setData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!form.id || !form.eventName || !form.date || !form.time || !form.location)
      return alert("Fill all fields");

    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setEditId(null);
    setForm({ id: "", eventName: "", date: "", time: "", location: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      eventName: item.eventName,
      date: item.date,
      time: item.time,
      location: item.location,
    });
    setEditId(item._id);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Events Management</h1>

      {/* FORM */}
      <div style={styles.card}>
        <input style={styles.input} placeholder="ID"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />

        <input style={styles.input} placeholder="Event Name"
          value={form.eventName}
          onChange={(e) => setForm({ ...form, eventName: e.target.value })}
        />

        <input type="date" style={styles.input}
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input type="time" style={styles.input}
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        <input style={styles.input} placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <button style={styles.addBtn} onClick={handleSubmit}>
          <FaPlus /> {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* TABLE */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Event</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((d) => (
              <tr key={d._id}>
                <td>{d.id}</td>
                <td>{d.eventName}</td>
                <td>{d.date}</td>
                <td>{d.time}</td>
                <td>{d.location}</td>
                <td>
                  <button style={styles.editBtn} onClick={() => handleEdit(d)}>
                    <FaEdit />
                  </button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(d._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    padding: "30px",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    minHeight: "100vh",
    color: "#fff",
  },

  heading: {
    textAlign: "center",
    color: "gold",
    marginBottom: "20px",
  },

  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
  },

  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    minWidth: "150px",
  },

  addBtn: {
    background: "gold",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  tableCard: {
    marginTop: "20px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
  },

  table: {
    width: "100%",
    textAlign: "center",
    borderCollapse: "collapse",
  },

  editBtn: {
    background: "orange",
    border: "none",
    padding: "6px",
    marginRight: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "red",
    border: "none",
    padding: "6px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ManageEvents;