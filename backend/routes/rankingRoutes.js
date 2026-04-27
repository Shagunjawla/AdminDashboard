const express = require("express");
const router = express.Router();
const Ranking = require("../models/Ranking");

router.get("/", async (req, res) => {
  res.json(await Ranking.find());
});

router.post("/", async (req, res) => {
  const data = new Ranking(req.body);
  await data.save();
  res.json(data);
});

router.delete("/:id", async (req, res) => {
  await Ranking.deleteOne({ id: req.params.id });
  res.send("Deleted");
});

router.put("/:id", async (req, res) => {
  res.json(await Ranking.updateOne({ id: req.params.id }, req.body));
});

module.exports = router;