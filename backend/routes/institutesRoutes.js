const express = require("express");
const router = express.Router();
const Institute = require("../models/Institutes");
const Institutes = require("../models/Institutes");


// ✅ GET ALL INSTITUTES
router.get("/", async (req, res) => {
    try {
        const data = await Institutes.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ ADD INSTITUTE
router.post("/", async (req, res) => {
    try {
        const { name, city } = req.body;

        const newInstitute = new Institute({
            name,
            city
        });

        const savedData = await newInstitute.save();
        res.status(201).json(savedData);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// ✅ GET SINGLE INSTITUTE BY ID
router.get("/:id", async (req, res) => {
    try {
        const data = await Institute.findById(req.params.id);

        if (!data) {
            return res.status(404).json({ message: "Institute not found" });
        }

        res.json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ UPDATE INSTITUTE
router.put("/:id", async (req, res) => {
    try {
        const updatedData = await Institutes.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedData);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// ✅ DELETE INSTITUTE
router.delete("/:id", async (req, res) => {
    try {
        await Institutes.findByIdAndDelete(req.params.id);
        res.json({ message: "Institute deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;