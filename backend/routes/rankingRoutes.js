const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// 🔥 Calculate Ranking
router.get("/calculate", async (req, res) => {
  try {
    // Sort students by points (descending)
    const students = await Student.find().sort({ points: -1 });

    // Assign ranks
    for (let i = 0; i < students.length; i++) {
      students[i].rank = i + 1;
      await students[i].save();
    }

    res.json({
      message: "Ranking Updated Successfully",
      data: students
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔥 Get Ranking List
router.get("/", async (req, res) => {
  const students = await Student.find().sort({ rank: 1 });
  res.json(students);
});

module.exports = router;