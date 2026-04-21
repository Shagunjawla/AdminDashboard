const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const QRCode = require("qrcode");

const app = express();
app.use(cors());
app.use(express.json());

/* ================= DATABASE CONNECT ================= */

mongoose.connect("mongodb://127.0.0.1:27017/skill_system")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ================= SCHEMAS ================= */

const User = mongoose.model("User", {
  email: String,
  password: String,
  role: String
});

const Student = mongoose.model("Student", {
  user_id: String,
  name: String,
  skills: String
});

const Activity = mongoose.model("Activity", {
  title: String,
  points: Number
});

const Submission = mongoose.model("Submission", {
  student_id: String,
  activity_id: String,
  proof_url: String,
  status: { type: String, default: "pending" }
});

const Point = mongoose.model("Point", {
  student_id: String,
  total_points: { type: Number, default: 0 }
});

const Certificate = mongoose.model("Certificate", {
  student_id: String,
  activity_id: String,
  qr_code: String
});

/* ================= AUTH ================= */

// Signup
app.post("/signup", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Login
app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);

  if (!user) return res.status(401).send("Invalid");

  res.json(user);
});

/* ================= STUDENT ================= */

app.post("/students", async (req, res) => {
  const student = await Student.create(req.body);

  await Point.create({ student_id: student._id });

  res.json(student);
});

app.get("/students", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

/* ================= ACTIVITIES ================= */

app.post("/activities", async (req, res) => {
  const act = await Activity.create(req.body);
  res.json(act);
});

app.get("/activities", async (req, res) => {
  const data = await Activity.find();
  res.json(data);
});

/* ================= SUBMISSIONS ================= */

app.post("/submit", async (req, res) => {
  const sub = await Submission.create(req.body);
  res.json(sub);
});

/* ================= APPROVE ================= */

app.post("/approve/:id", async (req, res) => {
  const sub = await Submission.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true }
  );

  const point = await Point.findOne({ student_id: sub.student_id });

  if (point) {
    point.total_points += 10;
    await point.save();
  }

  res.json(sub);
});

/* ================= LEADERBOARD ================= */

app.get("/leaderboard", async (req, res) => {
  const data = await Point.find().sort({ total_points: -1 });
  res.json(data);
});

/* ================= CERTIFICATE + QR ================= */

app.get("/certificate/:id", async (req, res) => {
  const verifyURL = `http://localhost:3000/verify/${req.params.id}`;

  const qr = await QRCode.toDataURL(verifyURL);

  const cert = await Certificate.create({
    student_id: "demo",
    activity_id: "demo",
    qr_code: qr
  });

  res.json({ qr, verifyURL });
});

/* ================= VERIFY ================= */

app.get("/verify/:id", async (req, res) => {
  res.json({
    name: "Shagun",
    activity: "Coding",
    status: "Verified"
  });
});

/* ================= START SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});