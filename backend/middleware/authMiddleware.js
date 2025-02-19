const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token || !token.startsWith('Bearer')) {
            return res.status(401).json({ message: "Not authorized to access this route" });
        }

        token = token.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password'); // Corrected to req.user
        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized to access this route" });
    }
};

module.exports = protect;