const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: String,
  name: String,
  city: String
});

module.exports = mongoose.model("Institute", schema);