
import { getChatService,getChatsService,addChatService,readChatService } from "../services/chatServices.js";


// to get all the chats
export const getChats = async(req,res)=>{
    try {
        const chats = await getChatsService(req);
        res.status(200).json(chats)
    } catch (error) {
        res.status(500).json({message:"Internal Server Error : can't get chats"})   
    }
}

//to get the chat
export const getChat = async(req,res)=>{
    try {
        const chat =  await getChatService(req);
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json({message:error})   
        
    }
}


// to add chat
export const addChat = async(req,res)=>{

    try {
        const addChat =  await addChatService(req);
        return res.status(200).json(addChat);
        
    } catch (error) {
       return res.status(500).json({message:"Internal Server Error : can't get chats"})   
    }
}


// to read the chat 
export const readChat = async(req,res)=>{
    try {
        const readChat = await readChatService(req);
        res.status(200).json(readChat);
    } catch (error) {
        res.status(500).json({message:"Internal Server Error : can't get chats"})   
    }
}