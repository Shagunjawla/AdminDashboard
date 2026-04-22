const express = require("express");
const router = express.Router();
const Points = require("../models/Points");

router.get("/", async (req, res) => {
  res.json(await Points.find());
});

router.post("/", async (req, res) => {
  res.json(await Points.create(req.body));
});

module.exports = router;