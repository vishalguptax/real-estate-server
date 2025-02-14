import express from "express";
import { addChat, getChat, getChats, readChat } from "../controllers/chatController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
//creating instance for chat router
const chatRouter = express.Router();

//define the method and routes
chatRouter.get("/get",verifyToken,getChats);
chatRouter.get("/:chatId",verifyToken,getChat);
chatRouter.post("/add",verifyToken,addChat);
chatRouter.put("/read/:chatId",verifyToken,readChat);

export {chatRouter}
