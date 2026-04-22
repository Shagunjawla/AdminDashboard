const express = require("express");
const router = express.Router();
const Badge = require("../models/Badge");

router.get("/", async (req, res) => {
  res.json(await Badge.find());
});

router.post("/", async (req, res) => {
  res.json(await Badge.create(req.body));
});

module.exports = router;