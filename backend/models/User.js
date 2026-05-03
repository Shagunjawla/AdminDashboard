// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  school: String,

  xp: {
    type: Number,
    default: 0
  },

  level: {
    type: Number,
    default: 1
  },

  badge: {
    type: String,
    default: "Beginner"
  },

  streak: {
    type: Number,
    default: 0
  },

  lastActive: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);