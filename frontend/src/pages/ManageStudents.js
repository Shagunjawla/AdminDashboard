import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/api/students";

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", department: "" });
  const [editId, setEditId] = useState(null);

  // GET DATA
  const fetchData = () => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data); // 🔥 debug
        setStudents(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ADD / UPDATE
  const handleSubmit = async () => {
    if (!form.id || !form.name || !form.department) {
      alert("Fill all fields");
      return;
    }

    try {
      let res;

      if (editId) {
        res = await fetch(`${API}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      const data = await res.json();
      console.log("RESPONSE:", data); // 🔥 debug

      setForm({ id: "", name: "", department: "" });
      setEditId(null);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      console.log("Deleting ID:", id); // 🔥 debug

      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log("DELETE RESPONSE:", data);

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT
  const handleEdit = (student) => {
    console.log("Editing:", student); // 🔥 debug

    setForm({
      id: student.id || "",
      name: student.name || "",
      department: student.department || "",
    });

    setEditId(student._id); // ✅ correct
  };

  return (
    <div style={styles.container}>
      <h1>Manage Students</h1>

      {/* FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="ID"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
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
            <th style={styles.cell}>Name</th>
            <th style={styles.cell}>Department</th>
            <th style={styles.cell}>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td style={styles.cell}>{s.id}</td>
              <td style={styles.cell}>{s.name}</td>
              <td style={styles.cell}>{s.department}</td>
              <td style={styles.cell}>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s._id)}>
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

// 🎨 STYLES
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
    textAlign: "center",
  },
};

export default ManageStudents;