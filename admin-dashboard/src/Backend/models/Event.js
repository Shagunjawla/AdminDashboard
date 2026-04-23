const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  points: Number
});

module.exports = mongoose.model("Event", eventSchema);