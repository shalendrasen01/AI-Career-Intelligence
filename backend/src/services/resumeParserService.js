const fs = require("fs");
const { PDFParse } = require("pdf-parse");

const extractTextFromPDF = async (filePath) => {
    try {
        // Read the PDF file
        const pdfBuffer = fs.readFileSync(filePath);

        // Create PDF parser
        const parser = new PDFParse({
            data: pdfBuffer
        });

        // Extract text
        const result = await parser.getText();

        // Release parser resources
        await parser.destroy();

        return result.text.trim();

    } catch (error) {
        console.error("PDF TEXT EXTRACTION ERROR:", error.message);
        throw new Error("Failed to extract text from PDF");
    }
};

module.exports = {
    extractTextFromPDF
};