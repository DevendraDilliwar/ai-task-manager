const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //check password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters long" });
        }

        //check if user already exists
        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword }
         
        //create new user
        const newUser = new User(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
        


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        //check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }
         
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.header('auth-token', token).json({token});
        res.status(200).json({message: "Login successful"});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
        
    }
}

module.exports = { registerUser, loginUser };