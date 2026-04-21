const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/students", require("./routes/studentRoutes"));
app.use("/institutes", require("./routes/instituteRoutes"));
app.use("/events", require("./routes/eventRoutes"));

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));