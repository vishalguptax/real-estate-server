
import express from "express";
import { addMessage } from "../controllers/messageController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

//creating instance for message router
const messageRouter = express.Router();

messageRouter.post("/:id",verifyToken,addMessage)

export {messageRouter}
