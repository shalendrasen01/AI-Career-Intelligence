const { calculateJobMatch } = require("../services/jobMatchingService");

const matchJobRole = async (req, res) => {
    try {
        const { resumeId, roleId } = req.body;

        if (!resumeId || !roleId) {
            return res.status(400).json({
                success: false,
                message: "resumeId and roleId are required"
            });
        }

        const result = await calculateJobMatch(
            resumeId,
            roleId
        );

        res.json({
            success: true,
            message: "Job match calculated successfully",
            match: result
        });

    } catch (error) {
        console.error("JOB MATCH CONTROLLER ERROR:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to calculate job match"
        });
    }
};

module.exports = {
    matchJobRole
};