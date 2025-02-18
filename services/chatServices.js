
import { prisma } from "../prisma/index.js";

/**
 * getChatsServices      - It shows all the chats.
 * @param {String} UserId - UserId of the user
 * @param {String} res    - response of the user
 * @returns {Object} chats   - Returns the chats object
 */
export const getChatsService = async(UserId,res) =>{
    
     console.log("User ID in getChatService:", UserId);  // Log userId here

     if (!UserId) {
       return res.status(400).send('User ID is missing');
     }
    const chats = await prisma.chat.findMany();
    console.log(chats)

    return chats;
}

/**
 * getChatServices      - It shows a chat of a user.
 * @param {String} UserId - UserId of the user
 * @param {String} req    - request used to get chatId of the user
 * @returns {Object} chat   - Returns the chat object
 */
export const getChatService = async(req,UserId) =>{
    console.log(req.params.id)
    console.log("0");
    const chat = await prisma.chat.findUnique({
        where:{
            id:req.params.id,
            userIDs :{
                hasSome:[UserId],
            },
        },
        include:{
            messages:{
                orderBy:{
                    createdAt: "asc",
                },
            },
        },
    });
console.log("1");
    await prisma.chat.update({
        where:{
            id:req.params.id,
        },
        data:{
            seenBy:{
                push:[UserId],
            },
        },
    });
console.log("2");

    return chat;
    
}

/**
 * addChatServices      - It generates a new user.
 * @param {String} UserId - UserId of the user
 * @param {String} req    - request used to get chatId of the user
 * @returns {Object} newChat   - Returns the newChat object
 */
export const addChatService = async(req,UserId) =>{
    
    const newChat = await prisma.chat.create({
        data:{
            userIDs : [UserId, req.body.receiverId],
            lastMessage: 'Chat created',
        },

    });
    return (newChat);
}

/**
 * readChatServices      - It generates a new user.
 * @param {String} UserId - UserId of the user
 * @param {String} req    - request used to get chatId of the user
 * @returns {Object} ReadChat   - Returns the ReadChat object
 */
export const readChatService = async(req,UserId) =>{
     
      console.log(`${UserId} and ${req.params.id}`)
    const ReadChat = await prisma.chat.update({
        where: {
          id: req.params.id,
          userIDs: {
            hasSome: [UserId],
          },
        },
        data: {
          seenBy: {
            set: [UserId],
          },
        },
      });
      return ReadChat;
}
















//   //  find the recevier and its information

//     for(const chat of chats)
//     {
//         const receiverId = chat.userIDs.find(
//             (id) => id !== UserId);
        
//         const receiver = await prisma.user.findUnique({
//             where:{
//                 id:receiverId,
//             },
//             select:{
//                 id:true,
//                 username:true,
//                 avatar:true,
//             },
//         });
//         // attach receiver info to object
//         chat.receiver=receiver;
//     }

    //return chat data