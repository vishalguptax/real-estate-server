import express from "express";
// import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import { errorHandler } from "./helpers/errorHandler.js";
import userRoute from './routes/userRoute.js';
dotenv.config({
    path: "./.env",
})

const PORT = process.env.APP_PORT;
const app = express();


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is working on port: ${PORT}`)
})