const express = require("express");
const router = express.Router();
const Institute = require("../models/Institute");

router.get("/", async (req, res) => {
  res.json(await Institute.find());
});

router.post("/", async (req, res) => {
  const data = await Institute.create(req.body);
  res.json(data);
});

router.delete("/:id", async (req, res) => {
  await Institute.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;