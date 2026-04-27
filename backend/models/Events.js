const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: String,
  name: String
});

module.exports = mongoose.model("Event", schema);