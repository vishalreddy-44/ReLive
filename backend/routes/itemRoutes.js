const express = require("express");
const Item = require("../models/Item");

const router = express.Router();

router.post("/", async function (req, res) {

    try {

        const newItem = new Item({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            location: req.body.location
        });

        const savedItem = await newItem.save();

        res.status(201).json({
            message: "Item listed successfully",
            item: savedItem
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to list item",
            error: error.message
        });

    }

});

module.exports = router;