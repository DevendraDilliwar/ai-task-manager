// services/aiService.js
const Task = require('../models/Task');

// Function to generate AI suggestions using Gemini 2.0 Flash Model via REST API
const generateAISuggestion = async () => {
    try {
        // Fetch all previous tasks (completed or not)
        const previousTasks = await Task.find();
        if (previousTasks.length === 0) {
            throw new Error('No previous tasks found');
        }

        // Create a prompt for the AI
        const prompt = `The user has worked on the following tasks:
${previousTasks.map(task => `- ${task.title}: ${task.description}`).join('\n')}

Suggest a new task that aligns with the user's previous activities:`;

        // Call the Gemini 2.0 Flash Model REST API
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }],
                    }],
                }),
            }
        );

        // Handle API response
        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`API Error: ${errorDetails.error.message}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text; // Extract the generated text
    } catch (error) {
        console.error('Error generating AI suggestion:', error);
        throw new Error('Failed to generate AI suggestion');
    }
};

module.exports = { generateAISuggestion };