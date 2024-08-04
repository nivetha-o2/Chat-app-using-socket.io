
const socket = io('http://localhost:5500',{
    auth: {
        secret:"This is a secret"
    },
    query:{
        meaningOfLife:42,
    }
})

socket.on('welcome',data=>{
    console.log(data)
    socket.emit('thankYou',[4,5,6])
})

socket.on('newClient',data=>{
    console.log('Message to all clients:A new socket has joined', data)
})

socket.on('messageFromServerToAllClients', newMessage=>{
    document.getElementById('messages').innerHTML += `<li>${newMessage}</li>`
})

document.getElementById('messages-form').addEventListener('submit',e=>{
    e.preventDefault()
    const newMessage = document.getElementById('user-message').value
    document.getElementById('user-message').value = ""
    socket.emit('messageFromClientToServer',newMessage)
})