// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  calculateLevel,
  getBadge,
} = require("../utils/levelSystem");

// ======================================
// CREATE USER
// ======================================
router.post("/", async (req, res) => {
  try {
    const { name, school } = req.body;

    // DEFAULT VALUES
    const xp = 0;
    const streak = 0;

    const level = calculateLevel(xp);
    const badge = getBadge(level);

    const user = new User({
      name,
      school,
      xp,
      streak,
      level,
      badge,
      lastActive: new Date(),
    });

    await user.save();

    res.json({
      success: true,
      msg: "User Created",
      user,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ======================================
// LIVE LEADERBOARD
// AUTO RANKING
// ======================================
router.get("/leaderboard", async (req, res) => {
  try {

    // XP + STREAK BASED SORT
    const users = await User.find().sort({
      xp: -1,
      streak: -1,
    });

    // AUTO LIVE RANK
    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      _id: user._id,
      name: user.name,
      school: user.school,
      xp: user.xp,
      level: user.level,
      badge: user.badge,
      streak: user.streak,
    }));

    res.json({
      success: true,
      leaderboard,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ======================================
// AUTO XP UPDATE
// ======================================
router.put("/xp/:id", async (req, res) => {
  try {

    const { earnedXP } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    // AUTO XP ADD
    user.xp += earnedXP;

    // AUTO LEVEL UPDATE
    user.level = calculateLevel(user.xp);

    // AUTO BADGE UPDATE
    user.badge = getBadge(user.level);

    // AUTO STREAK
    user.streak += 1;

    user.lastActive = new Date();

    await user.save();

    res.json({
      success: true,
      msg: "XP Updated Automatically",
      user,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ======================================
// DELETE USER
// ======================================
router.delete("/:id", async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      msg: "User Deleted",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;