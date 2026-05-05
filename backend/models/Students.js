const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: String,
  department: String
});

module.exports = mongoose.model('Students', studentSchema);