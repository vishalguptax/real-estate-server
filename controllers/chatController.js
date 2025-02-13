import ErrorResponse from "../helpers/errorResponse.js";
import SuccessResponse from "../helpers/successResponse.js";
import { getChatService,getChatsService,addChatService,readChatService } from "../services/chatServices.js";


// to get all the chats
export const getChats = async(req,res)=>{
    try {
        const chats = await getChatsService(req);
        //res.status(200).json(chats)
        return SuccessResponse.ok(res,"chats retreived succesfully",chats)
    } catch (error) {
        return ErrorResponse.internalServer(res, "Failed to get chat");
    }
}

//to get the chat
export const getChat = async(req,res)=>{
    try {
        const chat =  await getChatService(req);
        //res.status(200).json(chat)
        return SuccessResponse.ok(res,"chats retreived succesfully",chat)
    } catch (error) {
        return ErrorResponse.internalServer(res, {messgae:error});
        
    }
}


// to add chat
export const addChat = async(req,res)=>{

    try {
        const addChat =  await addChatService(req);
        //return res.status(200).json(addChat);
        return SuccessResponse.created(res,"users added to chat succesfully",addChat)
        
    } catch (error) {
        return ErrorResponse.internalServer(res, {messgae:"failed to add chat"});
    }
}


// to read the chat 
export const readChat = async(req,res)=>{
    try {
        const readChat = await readChatService(req);
        //res.status(200).json(readChat);
        return SuccessResponse.ok(res,"read chat succesfully",readChat)
    } catch (error) {
        return ErrorResponse.internalServer(res, {messgae:"failed to read chat"});
    }
}