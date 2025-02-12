
import { prisma } from "../prisma/index.js";

export const addMessageService = async(UserId,chatId,text) =>{
    //create a new message
    const message = await prisma.message.create({
        data:{
            text,
            chatId,
            userId:UserId,
        },
    });

    // update chat with new message
    await prisma.chat.update({
        where:{
            id:chatId,
             data:{
                seenBy:[UserId],
                lastMessage:text,
            },
        },
    });

    return message;

}