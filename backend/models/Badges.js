const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: String,
  bagde: String
});

module.exports = mongoose.model("Badge", schema);