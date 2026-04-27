const mongoose = require("mongoose");

const RankingSchema = new mongoose.Schema({
  id: String,
  rank: String,
  score: String,
});

module.exports = mongoose.model("Ranking", RankingSchema);