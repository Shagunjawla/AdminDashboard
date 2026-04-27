const express = require("express");
const router = express.Router();
const Student = require("../models/Students");

// ✅ GET ALL STUDENTS
router.get("/", async (req, res) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ ADD STUDENT
router.post("/", async (req, res) => {
  try {
    const data = new Student(req.body);
    await data.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE STUDENT
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE STUDENT
router.put("/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;