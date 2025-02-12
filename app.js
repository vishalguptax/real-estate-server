import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import { errorHandler } from "./helpers/errorHandler.js";
import userRoute from './routes/userRoute.js';
import { chatRouter } from "./routes/chatRoute.js";
import { messageRouter } from "./routes/messageRoute.js";
dotenv.config({
    path: "./.env",
})


const app = express();


app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("api/chats",chatRouter);
app.use("api/message",messageRouter);


app.use(errorHandler);
//const PORT = process.env.APP_PORT||5000;
const PORT = 4000
app.listen(PORT, () => {
    console.log(`Server is working on port: ${PORT}`)
})