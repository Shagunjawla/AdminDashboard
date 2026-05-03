const express = require("express");
const router = express.Router();
const Institute = require("../models/Institutes");


// ✅ GET ALL INSTITUTES
router.get("/", async (req, res) => {
    try {
        const data = await Institute.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ GET SINGLE INSTITUTE
router.get("/:id", async (req, res) => {
    try {
        const data = await Institute.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ ADD INSTITUTE
router.post("/", async (req, res) => {
    try {
        console.log("BODY:", req.body); // debug

        const newInstitute = new Institute(req.body);
        const saved = await newInstitute.save();

        res.json(saved);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});


// ✅ UPDATE INSTITUTE
router.put("/:id", async (req, res) => {
    try {
        const updated = await Institute.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ DELETE INSTITUTE
router.delete("/:id", async (req, res) => {
    try {
        await Institute.findByIdAndDelete(req.params.id);
        res.json({ message: "Institute deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;