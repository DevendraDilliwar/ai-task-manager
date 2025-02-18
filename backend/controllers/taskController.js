const Task = require('../models/taskModel');

const createTask = async (req, res) => {
    try {
       const { title, description, dueDate } = req.body; 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
        
    }
}