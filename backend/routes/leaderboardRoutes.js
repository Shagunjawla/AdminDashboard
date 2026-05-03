// routes/leaderboardRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GLOBAL RANK
router.get("/global", async (req, res) => {
    const users = await User.find().sort({ xp: -1 });

    const ranked = users.map((u, i) => ({
        ...u._doc,
        rank: i + 1
    }));

    res.json(ranked);
});

// WEEKLY
router.get("/weekly", async (req, res) => {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const users = await User.find({
        lastActive: { $gte: last7Days }
    }).sort({ xp: -1 });

    res.json(users);
});

// MONTHLY
router.get("/monthly", async (req, res) => {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const users = await User.find({
        lastActive: { $gte: last30Days }
    })
        .sort({ xp: -1 })
        .limit(10);

    res.json(users);
});

module.exports = router;