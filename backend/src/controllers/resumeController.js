const pool = require("../config/db");

const uploadResume = async (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume"
            });
        }

        // Get logged-in user's ID from JWT
        const userId = req.user.userId;

        // Save resume information in PostgreSQL
        const result = await pool.query(
            `INSERT INTO resumes
            (user_id, original_filename, file_path, mime_type, file_size)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, user_id, original_filename, file_path, mime_type, file_size, created_at`,
            [
                userId,
                req.file.originalname,
                req.file.path,
                req.file.mimetype,
                req.file.size
            ]
        );

        res.status(201).json({
            success: true,
            message: "Resume uploaded successfully",
            resume: result.rows[0]
        });

    } catch (error) {
        console.error("RESUME UPLOAD ERROR:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to upload resume"
        });
    }
};

module.exports = {
    uploadResume
};