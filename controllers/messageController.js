// 

import ErrorResponse from "../helpers/errorResponse.js";
import SuccessResponse from "../helpers/successResponse.js";
import { prisma } from "../prisma/index.js";
import { addMessageService } from "../services/messageServices.js";

/**
 * addMessages              - It calls the addMessageServices to start the chat or send the messages
 * @param {Object} req      - Express request object
 * @param {Object} res      - Express response object
 * @param {Function} next   - Express next function
 */

export const addMessage = async(req,res,next)=>{

    const UserId = req.userId;
    const chatId = req.params.id;
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
            return next(ErrorResponse.badRequest(res, "chat not found"));
        }

        // call add message service
        const message = await addMessageService(UserId, chatId, text);
        console.log(message)
        return SuccessResponse.ok(res,"chats retreived succesfully",message)
        
    } catch (error) {
        return next(ErrorResponse.internalServer(res, "Failed to add message"));
    }
}