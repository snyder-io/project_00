import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router
    .get('/user', protectRoute, getUsersForSidebar);
router
    .get('/:id', protectRoute, getMessages);
router
    .get('/send/:id', protectRoute, sendMessage);

export default router;