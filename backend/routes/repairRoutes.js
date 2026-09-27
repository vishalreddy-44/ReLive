const express = require("express");
const RepairRequest = require("../models/RepairRequest");

const router = express.Router();

router.post("/", async function (req, res) {

    try {

        const newRequest = new RepairRequest({
            itemName: req.body.itemName,
            category: req.body.category,
            description: req.body.description,
            location: req.body.location
        });

        const savedRequest = await newRequest.save();

        res.status(201).json({
            message: "Repair request submitted successfully",
            request: savedRequest
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to submit repair request",
            error: error.message
        });

    }

});

module.exports = router;