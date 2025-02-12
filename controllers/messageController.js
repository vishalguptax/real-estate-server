// 

import { prisma } from "../prisma/index.js";
import { addMessageService } from "../services/messageServices.js";


// to get all the chats
export const addMessage = async(req,res)=>{

    const UserId = req.userId;
    const chatId = req.params.chatId;
    const text = req.body.text;

    try {

        // check if user is part of chat or not
        const chat = await prisma.chat.findUnique({
            where:{
                id:chatId,
                userIDs:{
                    hasSome: [UserId],
                },
            },
        });

        //if chat not found
        if(!chat){
            return res.status(400).json({message:"chat not found"})
        }

        // call add message service
        const message = await addMessageService(UserId, chatId, text);
        res.status(200).json(message);
        
    } catch (error) {
        res.status(500).json({message:"can't add message"})
    }
}