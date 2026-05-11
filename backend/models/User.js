const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    school: String,

    attendance: {
      type: Boolean,
      default: false,
    },

    assignment: {
      type: Boolean,
      default: false,
    },

    quizMarks: {
      type: Number,
      default: 0,
    },

    project: {
      type: Boolean,
      default: false,
    },

    event: {
      type: Boolean,
      default: false,
    },

    xp: {
      type: Number,
      default: 0,
    },

    level: {
      type: Number,
      default: 1,
    },

    badge: {
      type: String,
      default: "Beginner",
    },

    streak: {
      type: Number,
      default: 0,
    },

    performanceScore: {
      type: Number,
      default: 0,
    },

    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// AUTO POINT SYSTEM
userSchema.pre("save", function (next) {

  let totalXP = 0;

  if (this.attendance) totalXP += 10;

  if (this.assignment) totalXP += 50;

  totalXP += this.quizMarks * 2;

  if (this.project) totalXP += 200;

  if (this.event) totalXP += 100;

  totalXP += this.streak * 5;

  this.xp = totalXP;

  // LEVEL
  if (totalXP >= 1000) {
    this.level = 10;
  } else if (totalXP >= 800) {
    this.level = 8;
  } else if (totalXP >= 600) {
    this.level = 6;
  } else if (totalXP >= 400) {
    this.level = 4;
  } else if (totalXP >= 200) {
    this.level = 2;
  } else {
    this.level = 1;
  }

  // BADGE
  if (this.level >= 10) {
    this.badge = "Diamond";
  } else if (this.level >= 8) {
    this.badge = "Platinum";
  } else if (this.level >= 6) {
    this.badge = "Gold";
  } else if (this.level >= 4) {
    this.badge = "Silver";
  } else if (this.level >= 2) {
    this.badge = "Bronze";
  } else {
    this.badge = "Beginner";
  }

  // PERFORMANCE SCORE
  this.performanceScore =
    this.xp +
    this.level * 20 +
    this.streak * 10;

  next();
});

module.exports = mongoose.model("User", userSchema);