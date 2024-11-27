import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genrateToken } from "../libs/utils.js";
import cloudinary from "../libs/cloudinary.js";

export const signup = async (req, res) => {
    // Take data from client
    const { fullName, email, password } = req.body;
    try {
        // Input validations
        if (!fullName) {
            return res.status(400).json({
                status: res.statusCode,
                message: "fullName is required"
            })
        }
        if (!email) {
            return res.status(400).json({
                status: res.statusCode,
                message: "email is required"
            })
        }
        if (!password) {
            return res.status(400).json({
                status: res.statusCode,
                message: "password is required"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                status: res.statusCode,
                message: "password must be at least 6 characters"
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                status: res.statusCode,
                message: "User already exists"
            })
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {
            //generate token
            genrateToken(newUser._id, res)
            await newUser.save();
            res.status(201).json(
                {
                    status: res.statusCode,
                    message: "User created successfully",
                    user: {
                        _id: newUser._id,
                        fullName: newUser.fullName,
                        email: newUser.email,
                        profileImage: newUser.profileImage,
                    }
                }
            )

        } else {
            res.status(400).json({
                message: "Invalid user data"
            })
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({
            message: "Intermal Server Error"
        })
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email) {
            return res.status(400).json({
                status: res.statusCode,
                message: "email is required"
            })
        }
        if (!password) {
            return res.status(400).json({
                status: res.statusCode,
                message: "password is required"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: res.statusCode,
                message: "User not found"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                status: res.statusCode,
                message: "Incorrect Password"
            });
        }
        genrateToken(user._id, res);
        res.status(200).json({
            status: res.statusCode,
            message: "User logged in successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImage: user.profileImage,
            }
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({
            status: res.statusCode,
            message: "User logged out successfully"
        });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profileImage } = req.body;
        const userId = req.user._id;

        if (!profileImage) {
            return res.status(400).json({
                status: res.statusCode,
                message: "Profile image is required"
            });
            const uploadResponse = await cloudinary.uploader.upload(profileImage)
            const updateUser = await User.findByIdAndUpdate(userId,
                {
                    profileImage: uploadResponse.secure_url
                }
                , { new: true });
        }
        res.status(200).json({
            status: res.statusCode,
            message: "Profile updated successfully",
            user: {
                _id: updateUser._id,
                fullName: updateUser.fullName,
                email: updateUser.email,
                profileImage: updateUser.profileImage,
            }
        });

    } catch (error) {
        console.log("Error in updateProfile controller", error.message);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(res.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}