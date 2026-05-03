const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  id: String,
  eventName: String,
  date: String,
  time: String,
  location: String,
});

module.exports = mongoose.model("Event", eventSchema);