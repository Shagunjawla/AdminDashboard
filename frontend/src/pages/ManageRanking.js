import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/api/ranking";

function ManageRanking() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ id: "", rank: "", score: "" });
  const [editId, setEditId] = useState(null);

  const fetchData = () => {
    fetch(API)
      .then(res => res.json())
      .then(setData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = () => {
    if (!form.id || !form.rank || !form.score)
      return alert("Fill all fields");

    if (editId) {
      fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
        .then(() => {
          setEditId(null);
          setForm({ id: "", rank: "", score: "" });
          fetchData();
        });
    } else {
      fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
        .then(() => {
          setForm({ id: "", rank: "", score: "" });
          fetchData();
        });
    }
  };

  const handleDelete = (id) =>
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then(fetchData);

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);   // 🔥 FIX
  };

  return (
    <div style={styles.container}>
      <h1>Ranking System</h1>

      <input
        placeholder="ID"
        value={form.id}
        onChange={e => setForm({ ...form, id: e.target.value })}
      />
      <input
        placeholder="Rank"
        value={form.rank}
        onChange={e => setForm({ ...form, rank: e.target.value })}
      />
      <input
        placeholder="Score"
        value={form.score}
        onChange={e => setForm({ ...form, score: e.target.value })}
      />

      <button onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.cell}>ID</th>
            <th style={styles.cell}>Rank</th>
            <th style={styles.cell}>Score</th>
            <th style={styles.cell}>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d) => (
            <tr key={d._id}>   {/* 🔥 FIX */}
              <td style={styles.cell}>{d.id}</td>
              <td style={styles.cell}>{d.rank}</td>
              <td style={styles.cell}>{d.score}</td>
              <td style={styles.cell}>
                <button onClick={() => handleEdit(d)}>Edit</button>
                <button onClick={() => handleDelete(d._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#000",
    color: "gold"
  },
  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse"   // 🔥 FIX
  },
  cell: {
    border: "1px solid gold",
    padding: "10px",
    textAlign: "center"
  }
};

export default ManageRanking;