const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

router.get("/", async (req, res) => {
  res.json(await Event.find());
});

router.post("/", async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
});

module.exports = router;