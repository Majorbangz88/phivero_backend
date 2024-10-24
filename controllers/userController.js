import userModel from "../models/userModel.js";
import validator from 'validator/index.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success: false, message: "User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({success: true, token});
        } else {
            res.json({success: false, message: 'Invalid credentials'});
        }
    } catch (error) {
        console.error(error)
        res.json({success: false, message: 'Invalid credentials'});
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success: false, message: 'User already exists'});
        }

        if (!name) {
            return res.status(400).json({success: false, message: 'Name is required'});
        }

        if (!validator.isEmail(email)) {
            return res.json({success: false, message: 'Please enter a valid email'});
        }

        if (password.length < 8) {
            return res.json({success: false, message: 'Password must be at least 8 characters'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id);
        res.status(200).json({success: true, token});

    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Something went wrong, please try again later'});

        // res.json({success: false, message: error.message});
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password} = req.body;

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const jwtSecret = process.env.JWT_SECRET;

        if (email === adminEmail && password === adminPassword) {
            const token = jwt.sign(email+password, jwtSecret);
            res.status(200).json({success: true, token});
        } else {
            res.json({success: false, message: "Invalid credentials"})
        }
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message});
    }
}

export { loginUser, registerUser, adminLogin };