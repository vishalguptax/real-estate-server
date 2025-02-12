
import { prisma } from "../prisma/index.js";


// to get chats for the user
export const getChatsService = async(req,res) =>{
    //extracts the sender userID from user array
     const UserId = req.userId;
     console.log("User ID in readChatService:", UserId);  // Log userId here

     if (!UserId) {
       return res.status(400).send('User ID is missing');
     }
    const chats = await prisma.chat.findMany({
        where:{
            userIDs :{
                hasSome:[UserId],
            },
        },
    });
    console.log(chats)

    //find the recevier and its information

    // for(const chat of chats)
    // {
    //     const receiverId = chat.userIDs.find(
    //         (id) => id !== UserId);
        
    //     const receiver = await prisma.user.findUnique({
    //         where:{
    //             id:receiverId,
    //         },
    //         select:{
    //             id:true,
    //             username:true,
    //             avatar:true,
    //         },
    //     });
    //     // attach receiver info to object
    //     chat.receiver=receiver;
    // }

    //return chat data
    return chats;
}

export const getChatService = async(req,res) =>{
    //extracts the sender userID from user array
    const UserId = req.userId;
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
    return chat;
    
}

export const addChatService = async(req,res) =>{
          //extracts the sender userID from user array
    const UserId = req.userId;
    const newChat = await prisma.chat.create({
        data:{
            userIDs : [UserId, req.body.receiverId],
        },

    });
    return (newChat);
}

export const readChatService = async(req,res) =>{
      //extracts the sender userID from user array
      const UserId = req.userId;
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