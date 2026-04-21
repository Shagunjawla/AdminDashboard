const express = require("express");
const router = express.Router();
const Institute = require("../models/Institute");

router.get("/", async (req, res) => {
  res.json(await Institute.find());
});

router.post("/", async (req, res) => {
  const inst = new Institute(req.body);
  await inst.save();
  res.json(inst);
});

module.exports = router;