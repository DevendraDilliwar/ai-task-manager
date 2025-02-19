const Task = require('../models/task');

const createTask = async (req, res) => {
    try {
       const { title, description, dueDate } = req.body;
         const task = new Task({
            title, description, dueDate, assignedTo: req.user._id
         })
            await task.save();
            res.status(201).json({ message: "Task created successfully", task });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
        
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user._id });
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) {
            task.title = req.body.title || task.title;
            task.description = req.body.description || task.description;
            task.dueDate = req.body.dueDate || task.dueDate;
            // task.status = req.body.status || task.status;
            const updatedTask = await task.save();
            res.status(200).json({ message: "Task updated successfully", task: updatedTask });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
    }
 

    const deleteTask = async (req, res) => {
        try {
            const task = await Task.findById(req.params.id);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            if(task.assignedTo.toString() !== req.user._id.toString()){
                return res.status(401).json({ message: "You are not authorized to delete this task" });
            }
            await Task.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: "Task deleted successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server Error" });
        }
    }

    module.exports = { createTask, getTasks, updateTask, deleteTask}
