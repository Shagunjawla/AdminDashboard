const express = require("express");
const router = express.Router();
const Institute = require("../models/Institute");

router.get("/", async (req, res) => {
  res.json(await Institute.find());
});

router.post("/", async (req, res) => {
  const data = new Institute(req.body);
  await data.save();
  res.json(data);
});

router.delete("/:id", async (req, res) => {
  await Institute.deleteOne({ id: req.params.id });
  res.send("Deleted");
});

router.put("/:id", async (req, res) => {
  res.json(await Institute.updateOne({ id: req.params.id }, req.body));
});

module.exports = router;