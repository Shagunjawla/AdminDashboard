const express = require("express");
const router = express.Router();
const Event = require("../models/Events");


// ✅ GET ALL EVENTS
router.get("/", async (req, res) => {
  try {
    const data = await Event.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✅ GET SINGLE EVENT
router.get("/:id", async (req, res) => {
  try {
    const data = await Event.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✅ ADD EVENT (🔥 FIXED)
router.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body); // debug

    const newEvent = new Event(req.body); // ✅ BEST
    const saved = await newEvent.save();

    res.json(saved);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


// ✅ UPDATE EVENT
router.put("/:id", async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,   // ✅ direct update
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✅ DELETE EVENT
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;