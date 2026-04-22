const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  type: String,
  address: String,
  verified: Boolean
});

module.exports = mongoose.model("Institute", schema);