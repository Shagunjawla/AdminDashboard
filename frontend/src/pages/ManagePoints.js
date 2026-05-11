import React, { useState } from "react";

function ManagePoints() {

  // ======================================
  // STUDENT LIST STATE
  // ======================================
  const [students, setStudents] = useState([]);

  // ======================================
  // FORM STATE
  // ======================================
  const [form, setForm] = useState({

    studentId: "",
    studentName: "",

    attendance: false,
    assignment: false,
    quizMarks: 0,
    project: false,
    event: false,
    streak: 0,

  });

  // ======================================
  // AUTO POINT CALCULATION
  // ======================================
  const calculatePoints = () => {

    let total = 0;

    if (form.attendance) {
      total += 10;
    }

    if (form.assignment) {
      total += 50;
    }

    total += Number(form.quizMarks) * 2;

    if (form.project) {
      total += 200;
    }

    if (form.event) {
      total += 100;
    }

    total += Number(form.streak) * 5;

    return total;
  };

  // ======================================
  // ADD STUDENT
  // ======================================
  const addStudent = () => {

    if (
      !form.studentId ||
      !form.studentName
    ) {
      return alert(
        "Enter Student ID & Name"
      );
    }

    const newStudent = {

      id: Date.now(),

      studentId: form.studentId,

      studentName: form.studentName,

      points: calculatePoints(),

      attendance: form.attendance,

      assignment: form.assignment,

      quizMarks: form.quizMarks,

      project: form.project,

      event: form.event,

      streak: form.streak,

    };

    setStudents([
      ...students,
      newStudent,
    ]);

    // RESET FORM
    setForm({

      studentId: "",
      studentName: "",

      attendance: false,
      assignment: false,
      quizMarks: 0,
      project: false,
      event: false,
      streak: 0,

    });
  };

  // ======================================
  // DELETE STUDENT
  // ======================================
  const deleteStudent = (id) => {

    const filtered =
      students.filter(
        (s) => s.id !== id
      );

    setStudents(filtered);
  };

  return (
    <div style={styles.container}>

      {/* FORM CARD */}
      <div style={styles.card}>

        <h1 style={styles.heading}>
          ⚡ Student Points System
        </h1>

        {/* STUDENT ID */}
        <div style={styles.inputGroup}>
          <label>Student ID</label>

          <input
            type="text"
            placeholder="Enter Student ID"
            value={form.studentId}
            onChange={(e) =>
              setForm({
                ...form,
                studentId:
                  e.target.value,
              })
            }
            style={styles.input}
          />
        </div>

        {/* STUDENT NAME */}
        <div style={styles.inputGroup}>
          <label>Student Name</label>

          <input
            type="text"
            placeholder="Enter Student Name"
            value={form.studentName}
            onChange={(e) =>
              setForm({
                ...form,
                studentName:
                  e.target.value,
              })
            }
            style={styles.input}
          />
        </div>

        {/* ATTENDANCE */}
        <label style={styles.label}>
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
          Attendance (+10)
        </label>

        {/* ASSIGNMENT */}
        <label style={styles.label}>
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
          Assignment (+50)
        </label>

        {/* QUIZ */}
        <div style={styles.inputGroup}>
          <label>Quiz Marks</label>

          <input
            type="number"
            placeholder="Enter Quiz Marks"
            value={form.quizMarks}
            onChange={(e) =>
              setForm({
                ...form,
                quizMarks:
                  e.target.value,
              })
            }
            style={styles.input}
          />
        </div>

        {/* PROJECT */}
        <label style={styles.label}>
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
          Project (+200)
        </label>

        {/* EVENT */}
        <label style={styles.label}>
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
          Event (+100)
        </label>

        {/* STREAK */}
        <div style={styles.inputGroup}>
          <label>Streak Days</label>

          <input
            type="number"
            placeholder="Enter Streak"
            value={form.streak}
            onChange={(e) =>
              setForm({
                ...form,
                streak:
                  e.target.value,
              })
            }
            style={styles.input}
          />
        </div>

        {/* LIVE POINTS */}
        <div style={styles.pointsBox}>

          <h2>
            Total Points
          </h2>

          <h1 style={styles.points}>
            {calculatePoints()}
          </h1>

        </div>

        {/* ADD BUTTON */}
        <button
          style={styles.addBtn}
          onClick={addStudent}
        >
          Add Student
        </button>

      </div>

      {/* STUDENT LIST */}
      <div style={styles.listCard}>

        <h2 style={styles.listHeading}>
          📋 Student List
        </h2>

        <table style={styles.table}>

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Points</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {students.map((student) => (

              <tr key={student.id}>

                <td>
                  {student.studentId}
                </td>

                <td>
                  {student.studentName}
                </td>

                <td>
                  {student.points}
                </td>

                <td>

                  <button
                    style={styles.deleteBtn}
                    onClick={() =>
                      deleteStudent(
                        student.id
                      )
                    }
                  >
                    Delete
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

export default ManagePoints;

// ==========================================
// STYLES
// ==========================================
const styles = {

  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#020617,#0f172a)",
    padding: "30px",
    color: "#fff",
  },

  card: {
    maxWidth: "600px",
    margin: "auto",
    background: "#1e293b",
    padding: "30px",
    borderRadius: "20px",
    marginBottom: "30px",
  },

  heading: {
    textAlign: "center",
    color: "#facc15",
    marginBottom: "25px",
  },

  inputGroup: {
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    marginTop: "8px",
  },

  label: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },

  pointsBox: {
    background: "#0f172a",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    marginTop: "20px",
    border: "2px solid #facc15",
  },

  points: {
    fontSize: "50px",
    color: "#facc15",
  },

  addBtn: {
    width: "100%",
    marginTop: "20px",
    padding: "14px",
    background: "#facc15",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  listCard: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "20px",
  },

  listHeading: {
    color: "#facc15",
    marginBottom: "20px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
  },

  deleteBtn: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};