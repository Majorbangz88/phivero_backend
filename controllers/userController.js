import userModel from "../models/userModel.js";
import validator from "validator/es";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (Id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {

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
        res.json({success: true, token});

    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Something went wrong, please try again later'});

        // res.json({success: false, message: error.message});
    }
}

const adminLogin = async (req, res) => {}

export default { loginUser, registerUser, adminLogin };