import express from "express";
import {verifyToken} from"../middlewares/verifyToken.js";
import { addPosts, getPost, getPosts, updatePost, deletePost } from "../controllers/userPostcontroller.js";


const router = express.Router();
router.get("/",getPosts);
router.get("/:id",getPost);
router.post("/",verifyToken,addPosts)
router.put("/:id",verifyToken,updatePost)
router.delete("/:id",verifyToken,deletePost)


export default router;
