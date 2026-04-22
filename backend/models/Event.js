const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  date: String,
  description: String
});

module.exports = mongoose.model("Event", schema);