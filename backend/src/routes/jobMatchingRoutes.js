const express = require("express");

const authMiddleware = require("../middleware/authmiddleware");
const { matchJobRole } = require("../controllers/jobMatchingController");

const router = express.Router();

// Calculate job match
router.post(
    "/match",
    authMiddleware,
    matchJobRole
);

module.exports = router;