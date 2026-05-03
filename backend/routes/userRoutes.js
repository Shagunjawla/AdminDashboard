// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { calculateLevel, getBadge } = require("../utils/levelSystem");

// CREATE
router.post("/", async (req, res) => {
  try {
    const { name, school, xp, streak } = req.body;

    const level = calculateLevel(xp || 0);
    const badge = getBadge(level);

    const user = new User({
      name,
      school,
      xp,
      level,
      badge,
      streak
    });

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL USERS
router.get("/", async (req, res) => {
  const users = await User.find().sort({ xp: -1 });
  res.json(users);
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { name, school, xp, streak } = req.body;

    const level = calculateLevel(xp || 0);
    const badge = getBadge(level);

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        school,
        xp,
        level,
        badge,
        streak,
        lastActive: new Date()
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;