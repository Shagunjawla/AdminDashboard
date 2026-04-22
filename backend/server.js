const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/institutes", require("./routes/instituteRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/badges", require("./routes/badgeRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/points", require("./routes/pointsRoutes"));

app.listen(5000, () => console.log("Server running on 5000"));