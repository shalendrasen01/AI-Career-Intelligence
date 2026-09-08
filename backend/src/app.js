const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api", protectedRoutes);
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "AI Career Intelligence API is running"
    });
});

app.get("/api/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            success: true,
            message: "Database connected successfully",
            time: result.rows[0].now
        });
    } catch (error) {
    console.error("DATABASE ERROR:", error.message);

    res.status(500).json({
        success: false,
        message: "Database connection failed",
        error: error.message
    });
}
});

module.exports = app;