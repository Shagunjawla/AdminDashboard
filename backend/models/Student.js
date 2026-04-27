const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  id: String,
  name: String,
  department: String
});

module.exports = mongoose.model("Student", studentSchema);