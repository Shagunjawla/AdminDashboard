const express = require("express");
const router = express.Router();

const Institute = require("../models/Institutes");


// ✅ GET ALL INSTITUTES
router.get("/", async (req, res) => {
    try {
        const data = await Institute.find().sort({ createdAt: -1 });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


// ✅ GET SINGLE INSTITUTE
router.get("/:id", async (req, res) => {
    try {
        const institute = await Institute.findById(req.params.id);

        if (!institute) {
            return res.status(404).json({
                success: false,
                message: "Institute not found",
            });
        }

        res.status(200).json(institute);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


// ✅ ADD INSTITUTE
router.post("/", async (req, res) => {
    try {
        const { cellId, name, city } = req.body;

        // VALIDATION
        if (!cellId || !name || !city) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        // CHECK DUPLICATE CELL ID
        const existingInstitute = await Institute.findOne({ cellId });

        if (existingInstitute) {
            return res.status(400).json({
                success: false,
                message: "Cell ID already exists",
            });
        }

        // CREATE
        const newInstitute = new Institute({
            cellId,
            name,
            city,
        });

        const savedInstitute = await newInstitute.save();

        res.status(201).json({
            success: true,
            message: "Institute added successfully",
            data: savedInstitute,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


// ✅ UPDATE INSTITUTE
router.put("/:id", async (req, res) => {
    try {
        const { cellId, name, city } = req.body;

        // VALIDATION
        if (!cellId || !name || !city) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        // CHECK DUPLICATE CELL ID
        const duplicate = await Institute.findOne({
            cellId,
            _id: { $ne: req.params.id },
        });

        if (duplicate) {
            return res.status(400).json({
                success: false,
                message: "Cell ID already exists",
            });
        }

        // UPDATE
        const updatedInstitute = await Institute.findByIdAndUpdate(
            req.params.id,
            {
                cellId,
                name,
                city,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedInstitute) {
            return res.status(404).json({
                success: false,
                message: "Institute not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Institute updated successfully",
            data: updatedInstitute,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


// ✅ DELETE INSTITUTE
router.delete("/:id", async (req, res) => {
    try {
        const deletedInstitute = await Institute.findByIdAndDelete(
            req.params.id
        );

        if (!deletedInstitute) {
            return res.status(404).json({
                success: false,
                message: "Institute not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Institute deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


module.exports = router;