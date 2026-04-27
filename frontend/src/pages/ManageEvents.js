import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/api/events";

function ManageEvents() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ id: "", eventName: "" });
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
    if (!form.id || !form.eventName)
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
    setForm({ id: "", eventName: "" });
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
    });
    setEditId(item._id); // 🔥 FIX
  };

  return (
    <div style={styles.container}>
      <h1>Events & Cells</h1>

      {/* FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="ID"
          value={form.id}
          onChange={(e) =>
            setForm({ ...form, id: e.target.value })
          }
        />
        <input
          placeholder="Event Name"
          value={form.eventName}
          onChange={(e) =>
            setForm({ ...form, eventName: e.target.value })
          }
        />
        <button onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* TABLE */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.cell}>ID</th>
            <th style={styles.cell}>Event</th>
            <th style={styles.cell}>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d) => (
            <tr key={d._id}>
              <td style={styles.cell}>{d.id}</td>
              <td style={styles.cell}>{d.eventName}</td>
              <td style={styles.cell}>
                <button onClick={() => handleEdit(d)}>Edit</button>
                <button onClick={() => handleDelete(d._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 🎨 STYLE FIX
const styles = {
  container: {
    padding: "20px",
    background: "#000",
    color: "gold",
    minHeight: "100vh",
  },
  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
  },
  cell: {
    border: "1px solid gold",
    padding: "10px",
    textAlign: "center", // 🔥 MAIN FIX
  },
};

export default ManageEvents;