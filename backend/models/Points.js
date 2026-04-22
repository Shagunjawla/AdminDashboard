const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  activity: String,
  points: Number
});

module.exports = mongoose.model("Points", schema);