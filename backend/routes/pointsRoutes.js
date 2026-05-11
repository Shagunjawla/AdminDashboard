// routes/pointsRoutes.js

const express = require("express");
const router = express.Router();

const Points = require("../models/Points");

// ==========================================
// GET ALL POINTS WITH LIVE RANK
// ==========================================
router.get("/", async (req, res) => {
  try {

    const users = await Points.find().sort({
      totalPoints: -1,
      streak: -1,
    });

    // AUTO RANK
    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      ...user._doc,
    }));

    res.json(leaderboard);

  } catch (err) {
    res.status(500).json(err);
  }
});

// ==========================================
// CREATE USER WITH AUTO POINTS
// ==========================================
router.post("/", async (req, res) => {
  try {

    const {
      name,
      school,
      attendance = false,
      assignment = false,
      quizMarks = 0,
      project = false,
      event = false,
      streak = 0,
    } = req.body;

    // =========================
    // AUTOMATIC POINT SYSTEM
    // =========================
    let totalPoints = 0;

    if (attendance) totalPoints += 10;

    if (assignment) totalPoints += 50;

    totalPoints += quizMarks * 2;

    if (project) totalPoints += 200;

    if (event) totalPoints += 100;

    totalPoints += streak * 5;

    // =========================
    // LEVEL SYSTEM
    // =========================
    let level = 1;

    if (totalPoints >= 500) level = 5;
    else if (totalPoints >= 400) level = 4;
    else if (totalPoints >= 300) level = 3;
    else if (totalPoints >= 200) level = 2;

    // =========================
    // BADGE SYSTEM
    // =========================
    let badge = "Beginner";

    if (level >= 5) badge = "Diamond";
    else if (level >= 4) badge = "Gold";
    else if (level >= 3) badge = "Silver";
    else if (level >= 2) badge = "Bronze";

    // SAVE
    const data = new Points({
      name,
      school,
      attendance,
      assignment,
      quizMarks,
      project,
      event,
      streak,
      totalPoints,
      level,
      badge,
      lastActive: new Date(),
    });

    await data.save();

    res.json({
      success: true,
      data,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// ==========================================
// UPDATE AUTOMATICALLY
// ==========================================
router.put("/:id", async (req, res) => {
  try {

    const oldUser = await Points.findById(req.params.id);

    if (!oldUser) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    const {
      attendance = oldUser.attendance,
      assignment = oldUser.assignment,
      quizMarks = oldUser.quizMarks,
      project = oldUser.project,
      event = oldUser.event,
      streak = oldUser.streak,
    } = req.body;

    // =========================
    // AUTO POINT CALCULATION
    // =========================
    let totalPoints = 0;

    if (attendance) totalPoints += 10;

    if (assignment) totalPoints += 50;

    totalPoints += quizMarks * 2;

    if (project) totalPoints += 200;

    if (event) totalPoints += 100;

    totalPoints += streak * 5;

    // =========================
    // AUTO LEVEL
    // =========================
    let level = 1;

    if (totalPoints >= 500) level = 5;
    else if (totalPoints >= 400) level = 4;
    else if (totalPoints >= 300) level = 3;
    else if (totalPoints >= 200) level = 2;

    // =========================
    // AUTO BADGE
    // =========================
    let badge = "Beginner";

    if (level >= 5) badge = "Diamond";
    else if (level >= 4) badge = "Gold";
    else if (level >= 3) badge = "Silver";
    else if (level >= 2) badge = "Bronze";

    const updated = await Points.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        totalPoints,
        level,
        badge,
        lastActive: new Date(),
      },
      { new: true }
    );

    res.json({
      success: true,
      updated,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// ==========================================
// DELETE USER
// ==========================================
router.delete("/:id", async (req, res) => {
  try {

    await Points.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      msg: "Deleted Successfully",
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;