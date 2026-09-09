const pool = require("../config/db");
const { extractTextFromPDF } = require("../services/resumeParserService");

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

        let extractedText = null;

        // Extract text from PDF
        if (req.file.mimetype === "application/pdf") {
            extractedText = await extractTextFromPDF(req.file.path);
        }

        // Save resume information and extracted text
        const result = await pool.query(
            `INSERT INTO resumes
            (user_id, original_filename, file_path, mime_type, file_size, extracted_text)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, user_id, original_filename, file_path, mime_type,
                      file_size, extracted_text, created_at`,
            [
                userId,
                req.file.originalname,
                req.file.path,
                req.file.mimetype,
                req.file.size,
                extractedText
            ]
        );

        res.status(201).json({
            success: true,
            message: "Resume uploaded and text extracted successfully",
            resume: result.rows[0]
        });

    } catch (error) {
        console.error("RESUME UPLOAD ERROR:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to upload and process resume"
        });
    }
};

module.exports = {
    uploadResume
};