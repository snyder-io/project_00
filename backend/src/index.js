import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { connectDB } from "./libs/db.js";
const PORT = process.env.PORT

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/message", messageRoutes)

app
    .listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
        connectDB();
    })