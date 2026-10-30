
const express = require("express");
const Item = require("../models/Item");

const router = express.Router();


/* =========================
   GET ALL ITEMS
========================= */

router.get("/", async function (req, res) {

    try {

        const items = await Item.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "Items fetched successfully",
            items: items
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch items",
            error: error.message
        });

    }

});


/* =========================
   ADD NEW ITEM
========================= */

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
