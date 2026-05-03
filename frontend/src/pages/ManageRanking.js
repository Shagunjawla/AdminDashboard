import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../components/Modal";

const API = "http://localhost:5000/api/leaderboard/global";

function ManageRanking() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    school: "",
    xp: "",
    level: "",
    badge: "",
    streak: "",
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
    if (!form.name || !form.xp) return alert("Fill required fields");

    const url = editId
      ? `http://localhost:5000/api/users/${editId}`
      : `http://localhost:5000/api/users`;

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      name: "",
      school: "",
      xp: "",
      level: "",
      badge: "",
      streak: "",
    });

    setEditId(null);
    setShowModal(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);
    setShowModal(true);
  };

  const filtered = data.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.heading}>🏆 Ranking System</h2>

        <button
          style={styles.addBtn}
          onClick={() => {
            setForm({
              name: "",
              school: "",
              xp: "",
              level: "",
              badge: "",
              streak: "",
            });
            setEditId(null);
            setShowModal(true);
          }}
        >
          <FaPlus /> Add Student
        </button>
      </div>

      {/* SEARCH */}
      <div style={styles.searchBox}>
        <FaSearch />
        <input
          placeholder="Search by Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* TABLE */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>School</th>
              <th>XP</th>
              <th>Level</th>
              <th>Badge</th>
              <th> Streak</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((d, index) => (
              <tr key={d._id}>
                <td>#{index + 1}</td>
                <td>{d.name}</td>
                <td>{d.school}</td>
                <td>{d.xp}</td>
                <td>{d.level}</td>
                <td>{d.badge}</td>
                <td>{d.streak}</td>

                <td>
                  <button
                    style={styles.editBtn}
                    onClick={() => handleEdit(d)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(d._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>{editId ? "Update Student" : "Add Student"}</h2>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={styles.modalInput}
        />

        <input
          placeholder="School"
          value={form.school}
          onChange={(e) => setForm({ ...form, school: e.target.value })}
          style={styles.modalInput}
        />

        <input
          placeholder="XP"
          value={form.xp}
          onChange={(e) => setForm({ ...form, xp: e.target.value })}
          style={styles.modalInput}
        />

        <input
          placeholder="Level"
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
          style={styles.modalInput}
        />

        <input
          placeholder="Badge"
          value={form.badge}
          onChange={(e) => setForm({ ...form, badge: e.target.value })}
          style={styles.modalInput}
        />

        <input
          placeholder="Streak"
          value={form.streak}
          onChange={(e) => setForm({ ...form, streak: e.target.value })}
          style={styles.modalInput}
        />

        <button onClick={handleSubmit} style={styles.saveBtn}>
          {editId ? "Update" : "Save"}
        </button>
      </Modal>
    </div>
  );
}

export default ManageRanking;
const styles = {
  container: {
    padding: "30px",
    background: "linear-gradient(135deg, #020617, #0f172a)",
    minHeight: "100vh",
    color: "#fff",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  heading: {
    color: "#facc15",
  },

  addBtn: {
    background: "gold",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#1e293b",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "20px",
  },

  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
  },

  tableCard: {
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

  modalInput: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "none",
  },

  saveBtn: {
    width: "100%",
    background: "gold",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};