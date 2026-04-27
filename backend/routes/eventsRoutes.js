const express = require("express");
const router = express.Router();
const Events = require("../models/Events");

router.get("/", async (req, res) => {
  res.json(await Events.find());
});

router.post("/", async (req, res) => {
  const data = new Events(req.body);
  await data.save();
  res.json(data);
});

router.delete("/:id", async (req, res) => {
  await Events.deleteOne({ _id: req.params.id });
  res.send("Deleted");
});

router.put("/:id", async (req, res) => {
  res.json(await Events.updateOne({ id: req.params.id }, req.body));
});

module.exports = router;