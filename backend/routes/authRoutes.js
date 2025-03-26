const express = require('express');
const { registerUser, loginUser, forgotPassword, resetPassword } = require('../controllers/authController');

const router = express.Router();

// @route   POST /api/auth/register
router.post('/register', registerUser);

// @route   POST /api/auth/login
router.post('/login', loginUser);

//@route POST /api/auth//forgot-password"
router.post('/forgot-password', forgotPassword)

//@route POST /api/auth/resetPassword
router.post('/reset-password/:token', resetPassword)

module.exports = router;
