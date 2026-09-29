const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const itemRoutes = require("./routes/itemRoutes");
const repairRoutes = require("./routes/repairRoutes");
const scrapRoutes = require("./routes/scrapRoutes");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/items", itemRoutes);
app.use("/api/repairs", repairRoutes);
app.use("/api/scrap", scrapRoutes);
mongoose.connect(process.env.MONGO_URI)
    .then(function () {
        console.log("MongoDB connected successfully");
    })
    .catch(function (error) {
        console.log("MongoDB connection failed:", error.message);
    });

app.get("/", function (req, res) {
    res.send("ReLive backend is running!");
});

const PORT = 5000;

app.listen(PORT, function () {
    console.log(`ReLive server running on http://localhost:${PORT}`);
});