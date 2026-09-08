const express = require("express");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "You accessed a protected route",
        user: req.user
    });
});

module.exports = router;