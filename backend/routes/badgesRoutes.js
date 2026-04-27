const express = require("express");
const router = express.Router();
const Badges = require("../models/Badges");

router.get("/", async (req, res) => {
  res.json(await Badges.find());
});

router.post("/", async (req, res) => {
  const data = new Badges(req.body);
  await data.save();
  res.json(data);
});

router.delete("/:id", async (req, res) => {
  await Badges.deleteOne({ id: req.params.id });
  res.send("Deleted");
});

router.put("/:id", async (req, res) => {
  res.json(await Badges.updateOne({ id: req.params.id }, req.body));
});

module.exports = router;