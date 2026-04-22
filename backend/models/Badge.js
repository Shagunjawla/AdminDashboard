const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  description: String,
  pointsRequired: Number
});

module.exports = mongoose.model("Badge", schema);