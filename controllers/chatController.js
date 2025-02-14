
import ErrorResponse from "../helpers/errorResponse.js";
import SuccessResponse from "../helpers/successResponse.js";
import { getChatService,getChatsService,addChatService,readChatService } from "../services/chatServices.js";


// to get all the chats
export const getChats = async(req,res)=>{

    //extracts the sender userID from user array
    const UserId = req.userId;
    try {
        const chats = await getChatsService(UserId);
       // res.status(200).json(chats)
       return SuccessResponse.ok({res,message:"success",chats})
    } catch (error) {
       // res.status(500).json({message:"Internal Server Error : can't get chats"})   
       return ErrorResponse.internalServer({res,message:error})
    }
}


//to get the chat
export const getChat = async(req,res)=>{
     //extracts the sender userID from user array
     const UserId = req.userId;
    try {
        const chat = await getChatService();
        //res.status(200).json(chat)
        return SuccessResponse.ok({res,message:"success",chat})
    } catch (error) {
       // res.status(500).json({message:"Internal Server Error : can't get chats"})   
       return ErrorResponse.internalServer({res,message:error})
        
    }
}


// to add chat
export const addChat = async(req,res)=>{
    const UserId = req.userId;

    try {
        const addChat = await addChatService();
        //res.status(200).json(addChat);
        return SuccessResponse.ok({res,message:"success",addChat})

    } catch (error) {
       // res.status(500).json({message:"Internal Server Error : can't get chats"})   
       return ErrorResponse.internalServer({res,message:error})

    }
}


// to read the chat 
export const readChat = async(req,res)=>{
    const UserId = req.userId;
    try {
        const readChat = await readChatService();
        //res.status(200).json(readChat);
        return SuccessResponse.ok({res,message:"success",readChat})

    } catch (error) {
        //res.status(500).json({message:"Internal Server Error : can't get chats"})   
       return ErrorResponse.internalServer({res,message:error})

    }
}