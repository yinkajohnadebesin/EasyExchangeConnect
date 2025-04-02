const { askYinka } = require("../utils/openaiServices");

const handleYinkaQuery = async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ message: "Question is required" });
    }

    try {
        const answer = await askYinka(question);
        res.json({ response: answer });
    } catch (error) {
        console.error("OpenAI Error:", error);
        res.status(500).json({ message: "Error fetching response from OpenAI" });
    }
};

module.exports = { handleYinkaQuery };