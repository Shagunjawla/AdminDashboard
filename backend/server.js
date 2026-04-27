const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

/* ✅ IMPORT ALL ROUTES */
const studentsRoutes = require("./routes/studentsRoutes");
const institutesRoutes = require("./routes/institutesRoutes");
const rankingRoutes = require("./routes/rankingRoutes");
const pointsRoutes = require("./routes/pointsRoutes");
const badgesRoutes = require("./routes/badgesRoutes");
const eventsRoutes = require("./routes/eventsRoutes");

/* ✅ USE ALL ROUTES */
app.use("/api/students", studentsRoutes);
app.use("/api/institutes", institutesRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/points", pointsRoutes);
app.use("/api/badges", badgesRoutes);
app.use("/api/events", eventsRoutes);

/* ✅ DATABASE CONNECT + SERVER START (FIXED) */
mongoose.connect("mongodb://127.0.0.1:27017/adminDB")
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  })
  .catch(err => {
    console.log("❌ DB Error:", err);
  });