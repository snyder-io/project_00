import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./libs/db.js";
const PORT = process.env.PORT

const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRoutes)

app
    .listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
        connectDB();
    })