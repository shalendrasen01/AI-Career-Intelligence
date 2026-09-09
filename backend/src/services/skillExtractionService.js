const pool = require("../config/db");

// Skills we currently support
const SKILL_DICTIONARY = [
    "Python",
    "Java",
    "C++",
    "C",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Express.js",
    "React",
    "Next.js",
    "HTML",
    "CSS",
    "SQL",
    "PostgreSQL",
    "MongoDB",
    "MySQL",
    "Git",
    "GitHub",
    "Docker",
    "AWS",
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "NLP",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "OpenCV",
    "Power BI",
    "Tableau",
    "REST API",
    "Data Structures",
    "Algorithms"
];

// Escape special characters before using a skill in a RegExp
const escapeRegExp = (text) => {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const extractSkills = async (resumeId, text) => {
    try {
        const detectedSkills = [];

        for (const skill of SKILL_DICTIONARY) {
            const escapedSkill = escapeRegExp(skill);

            // Match complete words/phrases instead of simple substrings
            const pattern = new RegExp(
                `(?<![a-zA-Z0-9+#])${escapedSkill}(?![a-zA-Z0-9+#])`,
                "i"
            );

            if (pattern.test(text)) {
                detectedSkills.push(skill);
            }
        }

        // Save detected skills in PostgreSQL
        for (const skill of detectedSkills) {
            await pool.query(
                `INSERT INTO resume_skills (resume_id, skill_name)
                 VALUES ($1, $2)
                 ON CONFLICT (resume_id, skill_name) DO NOTHING`,
                [resumeId, skill]
            );
        }

        return detectedSkills;

    } catch (error) {
        console.error("SKILL EXTRACTION ERROR:", error.message);
        throw new Error("Failed to extract skills");
    }
};

module.exports = {
    extractSkills
};