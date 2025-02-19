const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const protect = require('../middleware/authMiddleware');    
const router = express.Router();

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/create', protect, createTask);

// @route   GET /api/tasks
// @desc    Get all tasks
router.get('/', protect, getTasks);

// @route   PUT /api/tasks/:id
// @desc    Update a task
router.put('/:id', protect, updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete('/:id', protect, deleteTask);

module.exports = router;
