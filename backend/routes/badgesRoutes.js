const express = require("express");
const router = express.Router();
const Badge = require("../models/Badge");


// ✅ GET ALL BADGES
router.get("/", async (req, res) => {
  try {
    const data = await Badge.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✅ ADD BADGE
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const newBadge = new Badge({ name });

    const savedData = await newBadge.save();
    res.status(201).json(savedData);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// ✅ GET SINGLE BADGE BY ID
router.get("/:id", async (req, res) => {
  try {
    const data = await Badge.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Badge not found" });
    }

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✅ UPDATE BADGE
router.put("/:id", async (req, res) => {
  try {
    const updatedData = await Badge.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true }
    );

    res.json(updatedData);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// ✅ DELETE BADGE
router.delete("/:id", async (req, res) => {
  try {
    await Badge.findByIdAndDelete(req.params._id);
    res.json({ message: "Badge deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;