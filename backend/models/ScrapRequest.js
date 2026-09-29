const mongoose = require("mongoose");

const scrapRequestSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            trim: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 0
        },

        unit: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const ScrapRequest = mongoose.model(
    "ScrapRequest",
    scrapRequestSchema
);

module.exports = ScrapRequest;