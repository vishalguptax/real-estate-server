import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

// instance

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {  cors:{
    origin: "*"  
 } });

let onlineUser = [];


const addUser = (userId,socketId) => {
    const userExits = onlineUser.find((user) => user.userId === userId);
    if (!userExits) {
      onlineUser.push({ userId, socketId });
    }
}

const removeUser = (socketId) =>{
    onlineUser = onlineUser.filter((user)=>user.socketId!==socketId)
   
}

const getUser = (userId) => {
    return onlineUser.find((user)=>user.userId===userId)
}



// connection

io.on("connection", (socket) => {
    console.log(`socket ${socket.id} connected`)
    
    socket.on("newUser",(userId) =>{
       addUser(userId,socket.id);
    });

    socket.on("sendMessage",({receiverId,data}) => {
        const receiver = getUser(receiverId);
        io.to(receiver.socketId).emit("getMessage",data);
    })

    socket.on("disconnect", () => {
        removeUser(socket.id);
       
    })
});


io.listen(3000, () =>{
    console.log("server is listening ");
});