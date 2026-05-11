// ==========================================
// models/Points.js
// ==========================================

const mongoose = require("mongoose");

const pointsSchema = new mongoose.Schema(
  {
    // ======================================
    // USER INFO
    // ======================================
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    school: {
      type: String,
      required: true,
      trim: true,
    },

    // ======================================
    // ACTIVITY SYSTEM
    // ======================================
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

    // ======================================
    // STREAK SYSTEM
    // ======================================
    streak: {
      type: Number,
      default: 0,
    },

    // ======================================
    // LIVE POINTS
    // ======================================
    points: {
      type: Number,
      default: 0,
    },

    // ======================================
    // LEVEL SYSTEM
    // ======================================
    level: {
      type: Number,
      default: 1,
    },

    // ======================================
    // BADGE SYSTEM
    // ======================================
    badge: {
      type: String,
      default: "Beginner",
    },

    // ======================================
    // LIVE RANK
    // ======================================
    rank: {
      type: Number,
      default: 0,
    },

    // ======================================
    // PERFORMANCE SCORE
    // ======================================
    performanceScore: {
      type: Number,
      default: 0,
    },

    // ======================================
    // DAILY LOGIN
    // ======================================
    loginCount: {
      type: Number,
      default: 0,
    },

    // ======================================
    // LAST ACTIVE
    // ======================================
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);

// ==========================================
// AUTO POINT CALCULATION
// ==========================================
pointsSchema.pre("save", function (next) {

  let totalPoints = 0;

  // Attendance
  if (this.attendance) {
    totalPoints += 10;
  }

  // Assignment
  if (this.assignment) {
    totalPoints += 50;
  }

  // Quiz
  totalPoints += this.quizMarks * 2;

  // Project
  if (this.project) {
    totalPoints += 200;
  }

  // Event
  if (this.event) {
    totalPoints += 100;
  }

  // Streak
  totalPoints += this.streak * 5;

  // FINAL POINTS
  this.points = totalPoints;

  // ======================================
  // LEVEL SYSTEM
  // ======================================
  if (totalPoints >= 1000) {
    this.level = 10;
  } else if (totalPoints >= 800) {
    this.level = 8;
  } else if (totalPoints >= 600) {
    this.level = 6;
  } else if (totalPoints >= 400) {
    this.level = 4;
  } else if (totalPoints >= 200) {
    this.level = 2;
  } else {
    this.level = 1;
  }

  // ======================================
  // BADGE SYSTEM
  // ======================================
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

  // ======================================
  // PERFORMANCE SCORE
  // ======================================
  this.performanceScore =
    this.points +
    this.level * 20 +
    this.streak * 10;

  // ======================================
  // LAST ACTIVE
  // ======================================
  this.lastActive = new Date();

  next();
});

// ==========================================
// FAST LIVE RANKING INDEX
// ==========================================
pointsSchema.index({
  points: -1,
  streak: -1,
  performanceScore: -1,
});

// ==========================================
// EXPORT
// ==========================================
module.exports = mongoose.model(
  "Points",
  pointsSchema
);