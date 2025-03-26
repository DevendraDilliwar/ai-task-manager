// controllers/aiController.js
const { generateAISuggestion } = require('../services/aiService')

const generateResponse = async (req, res) => {
    try {
        const suggestion = await generateAISuggestion();
        res.status(200).send({ suggestion });
    } catch (error) {
        res.status(500).send({ error: 'Failed to generate suggestion' });
    }
};

module.exports = { generateResponse };