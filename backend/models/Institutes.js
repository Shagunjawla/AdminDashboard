const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema(
  {
    cellId: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    city: {
      type: String,
      required: true,
      trim: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Institute", instituteSchema);