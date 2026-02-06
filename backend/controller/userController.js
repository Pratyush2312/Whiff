import bcrypt from 'bcrypt'
import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const postUsersignup = async (req, res) => {
    try {
        const { firstname, lastname, email, password, phone, address } = req.body;

        if (!firstname || !lastname || !email || !password || !phone || !address) {
            return res.status(400).json({
                status: "error",
                message: "All fields are required",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid email format",
            });
        }

        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid phone number",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                status: "duplicate",
                message: "User already exists",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
            phone,
            address,
        });

        return res.status(201).json({
            status: "success",
            message: "Sign up successful",
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Server error",
        });
    }
};

export const postUserlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: "invalid",
                message: "Please Sign in"
            });
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(401).json({
                status: "invalid",
                message: "Password incorrect"
            });
        }


        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true
        });

        return res.json({
            status: "success",
            message: "Logged in",
        });

    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Server error"
        });
    }
};



export const getProfile = async (req, res) => {
    const user = await User.findById(req.user).select("-password")
    console.log(user)
    res.json(user)
}


export const logout = async (req, res) => {
    const userId=req.user
    await User.findByIdAndUpdate(userId, {
        isFirstLogin: false,
    });
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });

    res.json({
        status: "success",
        message: "Logged out successfully",
    });
};