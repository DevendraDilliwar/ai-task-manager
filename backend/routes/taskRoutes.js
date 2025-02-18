const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/', authMiddleware, createTask);

// @route   GET /api/tasks
// @desc    Get all tasks
router.get('/', authMiddleware, getTasks);

// @route   PUT /api/tasks/:id
// @desc    Update a task
router.put('/:id', authMiddleware, updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
