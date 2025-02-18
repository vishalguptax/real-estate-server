import ErrorResponse from "../helpers/errorResponse.js";
import SuccessResponse from "../helpers/successResponse.js";
import { getChatService,getChatsService,addChatService,readChatService } from "../services/chatServices.js";


/**
 * getChats                 - It calls the getChatsServices to retrieve all the chats
 * @param {Object} req      - Express request object
 * @param {Object} res      - Express response object
 * @param {Function} next   - Express next function
 */

export const getChats = async(req,res,next)=>{

    //extracts the sender userID from user array
    const UserId = req.userId;
    try {
        const chats = await getChatsService(req);
        //res.status(200).json(chats)
        return SuccessResponse.ok(res,"chats retreived succesfully",chats)
    } catch (error) {
        return next(ErrorResponse.internalServer(res, "Failed to get chat"));
    }
}

/**
 * getChat                  - It calls the getChatServices to retrieve the chat of a user
 * @param {Object} req      - Express request object
 * @param {Object} res      - Express response object
 * @param {Function} next   - Express next function
 */

export const getChat = async(req,res,next)=>{
     //extracts the sender userID from user array
     const UserId = req.userId;
    try {

        const chat =  await getChatService(req, UserId);
        //res.status(200).json(chat)
        console.log(chat)
        return SuccessResponse.ok(res,"chats retreived succesfully",chat)
    } catch (error) {
        return next(ErrorResponse.internalServer(res, {messgae:error}));
        
    }
}

/**
 * addChat                  - It calls the addChatsServices to create a new chatId or chatroom for user
 * @param {Object} req      - Express request object
 * @param {Object} res      - Express response object
 * @param {Function} next   - Express next function
 */

export const addChat = async(req,res,next)=>{
    const UserId = req.userId;

    try {
        const addChat =  await addChatService(req);
        //return res.status(200).json(addChat);
        return SuccessResponse.created(res,"users added to chat succesfully",addChat)
        
    } catch (error) {
        return next(ErrorResponse.internalServer(res, {messgae:"failed to add chat"}));
    }
}

/**
 * readChat                 - It calls the readChatServices to read the chat and update it using seenBy
 * @param {Object} req      - Express request object
 * @param {Object} res      - Express response object
 * @param {Function} next   - Express next function
 */

export const readChat = async(req,res,next)=>{
    const UserId = req.userId;
    try {
        const readChat = await readChatService(req,UserId);
        console.log(readChat)
        //res.status(200).json(readChat);
        return SuccessResponse.ok(res,"read chat succesfully",readChat)
      
    } catch (error) {
       return next(ErrorResponse.internalServer());
       //console.log(error)
        
    }
}