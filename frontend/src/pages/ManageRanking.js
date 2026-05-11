
import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaTrophy,
} from "react-icons/fa";

import Modal from "../components/Modal";

const API = "http://localhost:5000/api/users/leaderboard";

function ManageRanking() {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // ======================================
  // FORM
  // ======================================
  const [form, setForm] = useState({
    name: "",
    school: "",

    attendance: false,
    assignment: false,
    quizMarks: 0,
    project: false,
    event: false,
    streak: 0,
  });

  const [editId, setEditId] = useState(null);

  // ======================================
  // FETCH LIVE DATA
  // ======================================
  const fetchData = async () => {
    try {

      const res = await fetch(API);

      const result = await res.json();

      setData(result.leaderboard || []);

    } catch (err) {
      console.log(err);
    }
  };

  // ======================================
  // AUTO REFRESH
  // ======================================
  useEffect(() => {

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  // ======================================
  // SAVE / UPDATE
  // ======================================
  const handleSubmit = async () => {

    if (!form.name || !form.school) {
      return alert("Fill required fields");
    }

    try {

      const url = editId
        ? `http://localhost:5000/api/users/${editId}`
        : `http://localhost:5000/api/users`;

      const method = editId ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // RESET
      setForm({
        name: "",
        school: "",
        attendance: false,
        assignment: false,
        quizMarks: 0,
        project: false,
        event: false,
        streak: 0,
      });

      setEditId(null);

      setShowModal(false);

      fetchData();

    } catch (err) {
      console.log(err);
    }
  };

  // ======================================
  // DELETE
  // ======================================
  const handleDelete = async (id) => {

    try {

      await fetch(
        `http://localhost:5000/api/users/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchData();

    } catch (err) {
      console.log(err);
    }
  };

  // ======================================
  // EDIT
  // ======================================
  const handleEdit = (item) => {

    setForm({
      name: item.name,
      school: item.school,

      attendance: item.attendance,
      assignment: item.assignment,
      quizMarks: item.quizMarks,
      project: item.project,
      event: item.event,
      streak: item.streak,
    });

    setEditId(item._id);

    setShowModal(true);
  };

  // ======================================
  // SEARCH
  // ======================================
  const filtered = data.filter((d) =>
    d.name.toLowerCase().includes(
      search.toLowerCase()
    )
  );

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>

        <h2 style={styles.heading}>
          <FaTrophy /> Global Live Ranking
        </h2>

        <button
          style={styles.addBtn}
          onClick={() => {

            setForm({
              name: "",
              school: "",

              attendance: false,
              assignment: false,
              quizMarks: 0,
              project: false,
              event: false,
              streak: 0,
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
          placeholder="Search student..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={styles.input}
        />
      </div>

      {/* TABLE */}
      <div style={styles.tableCard}>

        <table style={styles.table}>

          <thead>
            <tr>
              <th>🏆 Rank</th>
              <th>Name</th>
              <th>School</th>
              <th>XP</th>
              <th>Level</th>
              <th>Badge</th>
              <th>🔥 Streak</th>
              <th>⭐ Score</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((d, index) => (

              <tr key={d._id}>

                <td>
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : `#${index + 1}`}
                </td>

                <td>{d.name}</td>

                <td>{d.school}</td>

                <td>{d.xp}</td>

                <td>{d.level}</td>

                <td>
                  <span style={styles.badge}>
                    {d.badge}
                  </span>
                </td>

                <td>{d.streak}</td>

                <td>
                  {d.performanceScore}
                </td>

                <td>

                  <button
                    style={styles.editBtn}
                    onClick={() =>
                      handleEdit(d)
                    }
                  >
                    <FaEdit />
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() =>
                      handleDelete(d._id)
                    }
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
      <Modal
        show={showModal}
        onClose={() =>
          setShowModal(false)
        }
      >

        <h2 style={{ color: "#000" }}>
          {editId
            ? "Update Student"
            : "Add Student"}
        </h2>

        {/* NAME */}
        <input
          placeholder="Student Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          style={styles.modalInput}
        />

        {/* SCHOOL */}
        <input
          placeholder="School Name"
          value={form.school}
          onChange={(e) =>
            setForm({
              ...form,
              school: e.target.value,
            })
          }
          style={styles.modalInput}
        />

        {/* QUIZ */}
        <input
          type="number"
          placeholder="Quiz Marks"
          value={form.quizMarks}
          onChange={(e) =>
            setForm({
              ...form,
              quizMarks: e.target.value,
            })
          }
          style={styles.modalInput}
        />

        {/* STREAK */}
        <input
          type="number"
          placeholder="Streak"
          value={form.streak}
          onChange={(e) =>
            setForm({
              ...form,
              streak: e.target.value,
            })
          }
          style={styles.modalInput}
        />

        {/* CHECKBOXES */}
        <div style={styles.checkGroup}>

          <label>
            <input
              type="checkbox"
              checked={form.attendance}
              onChange={(e) =>
                setForm({
                  ...form,
                  attendance:
                    e.target.checked,
                })
              }
            />
            Attendance
          </label>

          <label>
            <input
              type="checkbox"
              checked={form.assignment}
              onChange={(e) =>
                setForm({
                  ...form,
                  assignment:
                    e.target.checked,
                })
              }
            />
            Assignment
          </label>

          <label>
            <input
              type="checkbox"
              checked={form.project}
              onChange={(e) =>
                setForm({
                  ...form,
                  project:
                    e.target.checked,
                })
              }
            />
            Project
          </label>

          <label>
            <input
              type="checkbox"
              checked={form.event}
              onChange={(e) =>
                setForm({
                  ...form,
                  event:
                    e.target.checked,
                })
              }
            />
            Event
          </label>

        </div>

        <button
          onClick={handleSubmit}
          style={styles.saveBtn}
        >
          {editId
            ? "Update Student"
            : "Save Student"}
        </button>

      </Modal>
    </div>
  );
}

export default ManageRanking;

// ==========================================
// STYLES
// ==========================================
const styles = {

  container: {
    padding: "30px",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#020617,#0f172a)",
    color: "#fff",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  heading: {
    color: "#facc15",
    fontSize: "28px",
  },

  addBtn: {
    background: "#facc15",
    color: "#000",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#1e293b",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: "16px",
  },

  tableCard: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "15px",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
  },

  badge: {
    background: "#facc15",
    color: "#000",
    padding: "5px 10px",
    borderRadius: "20px",
    fontWeight: "bold",
  },

  editBtn: {
    background: "orange",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    marginRight: "5px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "red",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  modalInput: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  checkGroup: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "20px",
    color: "#000",
  },

  saveBtn: {
    width: "100%",
    padding: "12px",
    background: "#facc15",
    color: "#000",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};