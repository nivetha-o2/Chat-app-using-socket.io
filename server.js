const express = require('express')
const app = express()
app.use(express.static('public'))
const expressServer = app.listen(5500)

const {Server} = require('socket.io')
const socketio = require('socket.io')
const io = new Server(expressServer,{
    cors:[
        "http://localhost:5500"
    ]

})

io.on('connection', socket => {
    console.log(socket.handshake)
    console.log(socket.id, "has joined our server!")
    // socket.emit('welcome',[1,2,3])
    // io.emit('newClient',socket.id)
    // socket.on('thankYou',data=>{
    //     console.log("message from client",data)
    // })
    socket.on('messageFromClientToServer', newMessage=>{
        io.emit('messageFromServerToAllClients',newMessage)
    })
})