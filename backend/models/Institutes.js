const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Institute", instituteSchema);