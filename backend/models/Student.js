const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  email: String,
  institute: String,
  points: { type: Number, default: 0 },
  rank: { type: Number, default: 0 }
});

module.exports = mongoose.model("Student", schema);