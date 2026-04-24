import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/api/students";

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", department: "" });
  const [editId, setEditId] = useState(null);

  // GET
  const fetchData = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ADD or UPDATE
  const handleSubmit = () => {
    if (!form.id || !form.name || !form.department) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      // UPDATE
      fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).then(() => {
        setEditId(null);
        setForm({ id: "", name: "", department: "" });
        fetchData();
      });
    } else {
      // ADD
      fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).then(() => {
        setForm({ id: "", name: "", department: "" });
        fetchData();
      });
    }
  };

  // DELETE
  const handleDelete = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(fetchData);
  };

  // EDIT (fill form)
  const handleEdit = (student) => {
    setForm(student);
    setEditId(student.id);
  };

  return (
    <div style={styles.container}>
      <h1>Manage Students</h1>

      {/* FORM */}
      <div>
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
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />

        <button onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* TABLE */}
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
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.department}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
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
    color: "gold",
    minHeight: "100vh",
  },
  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
  },
};

export default ManageStudents;