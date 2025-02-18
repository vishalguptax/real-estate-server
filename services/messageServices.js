
import { prisma } from "../prisma/index.js";



/**
 * addMessageServices      - It shows a chat of a user.
 * @param {String} UserId - UserId of the user
 * @param {String} chatId   -  chatId of the user
 * @param {String} text - message
 * @returns {Object} message   - Returns the message object
 */

export const addMessageService = async(UserId,chatId,text) =>{
    //create a new message
    const message = await prisma.message.create({
        data:{
            text:text,
            chatId:chatId,
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