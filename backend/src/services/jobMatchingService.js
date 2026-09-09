const pool = require("../config/db");

const calculateJobMatch = async (resumeId, roleId) => {
    try {
        // Get skills from the user's resume
        const resumeResult = await pool.query(
            `SELECT skill_name
             FROM resume_skills
             WHERE resume_id = $1`,
            [resumeId]
        );

        // Get skills required by the selected job role
        const roleResult = await pool.query(
            `SELECT skill_name
             FROM role_skills
             WHERE role_id = $1`,
            [roleId]
        );

        const resumeSkills = resumeResult.rows.map(
            row => row.skill_name.toLowerCase()
        );

        const requiredSkills = roleResult.rows.map(
            row => row.skill_name.toLowerCase()
        );

        // Find matching skills
        const matchedSkills = requiredSkills.filter(
            skill => resumeSkills.includes(skill)
        );

        // Find missing skills
        const missingSkills = requiredSkills.filter(
            skill => !resumeSkills.includes(skill)
        );

        // Calculate percentage match
        const totalRequiredSkills = requiredSkills.length;

        const matchScore = totalRequiredSkills === 0
            ? 0
            : Math.round(
                (matchedSkills.length / totalRequiredSkills) * 100
            );

        return {
            resumeId,
            roleId,
            matchScore,
            matchedSkills,
            missingSkills,
            totalRequiredSkills,
            totalMatchedSkills: matchedSkills.length
        };

    } catch (error) {
        console.error("JOB MATCHING ERROR:", error.message);
        throw new Error("Failed to calculate job match");
    }
};

module.exports = {
    calculateJobMatch
};