import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../components/Modal";

const API = "http://localhost:5000/api/students";

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    id: "",
    name: "",
    department: "",
  });

  const [editId, setEditId] = useState(null);

  // FETCH
  const fetchData = () => {
    fetch(API)
      .then((res) => res.json())
      .then(setStudents);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ADD / UPDATE
  const handleSubmit = async () => {
    if (!form.id || !form.name || !form.department)
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

    setForm({ id: "", name: "", department: "" });
    setEditId(null);
    setShowModal(false);
    fetchData();
  };

  // DELETE
  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchData();
  };

  // EDIT
  const handleEdit = (student) => {
    setForm(student);
    setEditId(student._id);
    setShowModal(true);
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.heading}>Manage Student</h2>

        <button
          style={styles.addBtn}
          onClick={() => {
            setForm({ id: "", name: "", department: "" });
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
          placeholder="Search student..."
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
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => (
              <tr key={s._id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.department}</td>
                <td>
                  <button
                    style={styles.editBtn}
                    onClick={() => handleEdit(s)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(s._id)}
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
          placeholder="ID"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          style={styles.modalInput}
        />

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={styles.modalInput}
        />

        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
          style={styles.modalInput}
        />

        <button onClick={handleSubmit} style={styles.saveBtn}>
          {editId ? "Update" : "Save"}
        </button>
      </Modal>
    </div>
  );
}

export default ManageStudents;


// 🎨 STYLES
const styles = {
  container: {
    marginLeft: "000px",
    padding: "30px",
    background: "linear-gradient(135deg, #020617, #0f172a)",
    minHeight: "100vh",
    color: "#fff",
  },

  heading: {
    color: "#facc15",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
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