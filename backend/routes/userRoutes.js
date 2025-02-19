const express = require('express');
const { getUserProfile } = require('../controllers/userController');

const protect = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/users/me
// @desc    Get logged-in user details
router.get('/profile', protect, getUserProfile);

module.exports = router;
