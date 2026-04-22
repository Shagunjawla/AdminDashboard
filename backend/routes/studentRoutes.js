const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.get("/", async (req, res) => {
  res.json(await Student.find());
});

router.post("/", async (req, res) => {
  const data = await Student.create(req.body);
  res.json(data);
});

module.exports = router;