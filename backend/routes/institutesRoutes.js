const express = require("express");
const router = express.Router();
const Institute = require("../models/Institute");

// ✅ GET ALL
router.get("/", async (req, res) => {
  try {
    const data = await Institute.find().select("_id name city");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ ADD
router.post("/", async (req, res) => {
  try {
    const data = new Institute({
      name: req.body.name,
      city: req.body.city,
    });
    await data.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Institute.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Institute.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        city: req.body.city,
      },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;