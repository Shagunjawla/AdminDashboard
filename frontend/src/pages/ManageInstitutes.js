import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../components/Modal";

const API = "http://localhost:5000/api/institutes";

function ManageInstitutes() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    cellId: "",
    name: "",
    city: "",
  });

  const [editId, setEditId] = useState(null);

  // ✅ FETCH DATA
  const fetchData = async () => {
    try {
      const res = await fetch(API);

      const result = await res.json();

      console.log("API RESPONSE:", result);

      // ✅ FIXED
      setData(result.data || result);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ SUBMIT
  const handleSubmit = async () => {

    if (!form.cellId || !form.name || !form.city) {
      return alert("Please fill all fields");
    }

    const cleanData = {
      cellId: form.cellId,
      name: form.name,
      city: form.city,
    };

    try {

      let response;

      // ✅ UPDATE
      if (editId) {

        response = await fetch(`${API}/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cleanData),
        });

      } else {

        // ✅ ADD
        response = await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cleanData),
        });
      }

      const result = await response.json();

      console.log(result);

      // ✅ SUCCESS MESSAGE
      alert(result.message || "Success");

      // ✅ RESET
      setForm({
        cellId: "",
        name: "",
        city: "",
      });

      setEditId(null);

      setShowModal(false);

      // ✅ RELOAD DATA
      fetchData();

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {

      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      alert(result.message);

      fetchData();

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ EDIT
  const handleEdit = (item) => {

    setForm({
      cellId: item.cellId,
      name: item.name,
      city: item.city,
    });

    setEditId(item._id);

    setShowModal(true);
  };

  // ✅ SEARCH FILTER
  const filtered = data.filter((d) =>
    d.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>

        <h2 style={styles.heading}>
          Manage Institutes
        </h2>

        <button
          style={styles.addBtn}
          onClick={() => {

            setForm({
              cellId: "",
              name: "",
              city: "",
            });

            setEditId(null);

            setShowModal(true);
          }}
        >
          <FaPlus />
          Add Institute
        </button>
      </div>

      {/* SEARCH */}
      <div style={styles.searchBox}>

        <FaSearch color="#facc15" />

        <input
          type="text"
          placeholder="Search institute..."
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
              <th style={styles.th}>Cell ID</th>
              <th style={styles.th}>Institute Name</th>
              <th style={styles.th}>City</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>

            {filtered.length > 0 ? (

              filtered.map((d) => (

                <tr key={d._id} style={styles.tr}>

                  <td style={styles.td}>
                    {d.cellId}
                  </td>

                  <td style={styles.td}>
                    {d.name}
                  </td>

                  <td style={styles.td}>
                    {d.city}
                  </td>

                  <td style={styles.td}>

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
              ))

            ) : (

              <tr>
                <td
                  colSpan="4"
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#94a3b8",
                  }}
                >
                  No Institutes Found
                </td>
              </tr>

            )}

          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
      >

        <h2
          style={{
            color: "#facc15",
            marginBottom: "20px",
          }}
        >
          {editId
            ? "Update Institute"
            : "Add Institute"}
        </h2>

        {/* CELL ID */}
        <input
          type="text"
          placeholder="Cell ID"
          value={form.cellId}
          onChange={(e) =>
            setForm({
              ...form,
              cellId: e.target.value,
            })
          }
          style={styles.modalInput}
        />

        {/* NAME */}
        <input
          type="text"
          placeholder="Institute Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          style={styles.modalInput}
        />

        {/* CITY */}
        <input
          type="text"
          placeholder="City"
          value={form.city}
          onChange={(e) =>
            setForm({
              ...form,
              city: e.target.value,
            })
          }
          style={styles.modalInput}
        />

        {/* SAVE BUTTON */}
        <button
          onClick={handleSubmit}
          style={styles.saveBtn}
        >
          {editId
            ? "Update Institute"
            : "Save Institute"}
        </button>

      </Modal>
    </div>
  );
}

export default ManageInstitutes;


// 🎨 STYLES
const styles = {

  container: {
    padding: "30px",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #020617, #0f172a)",
    color: "#fff",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  heading: {
    color: "#facc15",
    fontSize: "28px",
    fontWeight: "bold",
  },

  addBtn: {
    background:
      "linear-gradient(135deg, #facc15, #eab308)",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#000",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#1e293b",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "25px",
    border: "1px solid #334155",
  },

  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: "15px",
  },

  tableCard: {
    background: "#1e293b",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 0 15px rgba(0,0,0,0.4)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    background: "#0f172a",
    color: "#facc15",
    padding: "16px",
    textAlign: "center",
    borderBottom: "1px solid #334155",
  },

  tr: {
    borderBottom: "1px solid #334155",
  },

  td: {
    padding: "14px",
    textAlign: "center",
  },

  editBtn: {
    background: "#f59e0b",
    border: "none",
    padding: "8px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "8px",
    color: "#fff",
  },

  deleteBtn: {
    background: "#ef4444",
    border: "none",
    padding: "8px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#fff",
  },

  modalInput: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "#fff",
    outline: "none",
  },

  saveBtn: {
    width: "100%",
    background:
      "linear-gradient(135deg, #facc15, #eab308)",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#000",
    fontSize: "15px",
  },
};