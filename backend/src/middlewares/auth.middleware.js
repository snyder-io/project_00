import jwt from "jsonwebtoken";
import { } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                status: res.statusCode,
                message: "Unauthorized - No Token Provided"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                status: res.statusCode,
                message: "Unauthorized - Invalid Token"
            })
        }
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({
                status: res.statusCode,
                message: "Unauthorized - User Not Found"
            })
        }
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in auth middleware", error.message);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}