const mongoose = require("mongoose");

const RankingSchema = new mongoose.Schema({
  id: String,
  rank: Number,
  score: String
});

module.exports = mongoose.model("Ranking", RankingSchema);