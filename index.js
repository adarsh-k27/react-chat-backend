const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app = express()
const socket = require('socket.io')
const AuthRouter = require('./Routes/authRoutes')
const UserRouter = require('./Routes/userRouter')
const MessageRouter = require('./Routes/messageRouter')
//middleware setup
app.use(express.json())
app.use(cors())
app.use('/api/auth', AuthRouter)
app.use('/user', UserRouter)
app.use('/chat', MessageRouter)

//mongo db connection
mongoose.connect(process.env.DB_URL)
mongoose.connection
    .on('open', () => console.log("Database Connecte SuccesFully"))
    .on('error', (error) => console.log("MongooseError::::", error))

//server setup
const server = app.listen(process.env.PORT, () => console.log("Server Connected To Port", process.env.PORT))
const io = socket(server, {
    cors: {
        origin: "https://dazzling-lolly-08748c.netlify.app",
        methods: ["GET", "POST"],
        credentials: true
    }
})
let onlineUsers = []

io.on("connection", (socket) => {

    socket.on("add-user", (userId) => {

        if (userId !== "" && !onlineUsers.some((user) => user.userId == userId)) {
            onlineUsers.push({
                userId,
                socketId: socket.id
            })
        }
        console.log("online ", onlineUsers);
        io.emit('get-online-users', onlineUsers)
    })


    socket.on("send-message", (message) => {
        //check if reciever online
        const recieverSocket = onlineUsers.find((user) => user.userId == message.to)
        if (recieverSocket) {
            newMessage={
                message:message.message,
                currentMessage:false,
                userName:message.userName,
                from:message.from
            }
          io.to(recieverSocket.socketId).emit('recieve-message',newMessage)
        }


    })
    socket.on('logout-user',(userId)=>{
        console.log("LOGOUT FACE");
        console.log("logOutUser",userId);
        onlineUsers=onlineUsers.filter((user)=>user.userId !== userId)
        io.emit('get-online-users', onlineUsers)
        console.log("notlogouted",onlineUsers);
    })

    socket.on("disconnect", () => {
        console.log("diconnected User");
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
        console.log("onlineRemains", onlineUsers);
        io.emit('get-online-users', onlineUsers)
    })
})