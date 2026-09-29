const express = require("express");
const ScrapRequest = require("../models/ScrapRequest");

const router = express.Router();

router.post("/", async function (req, res) {

    try {

        const newRequest = new ScrapRequest({
            category: req.body.category,
            quantity: req.body.quantity,
            unit: req.body.unit,
            location: req.body.location
        });

        const savedRequest = await newRequest.save();

        res.status(201).json({
            message: "Scrap pickup request submitted successfully",
            request: savedRequest
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to submit scrap pickup request",
            error: error.message
        });

    }

});

module.exports = router;