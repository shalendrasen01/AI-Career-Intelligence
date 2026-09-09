const express = require("express");

const authMiddleware = require("../middleware/authmiddleware");
const upload = require("../middleware/uploadMiddleware");
const { uploadResume } = require("../controllers/resumeController");

const router = express.Router();

// Upload resume
router.post(
    "/upload",
    authMiddleware,
    upload.single("resume"),
    uploadResume
);

module.exports = router;