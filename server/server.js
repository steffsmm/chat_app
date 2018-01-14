const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname,"../public");
const port = process.env.PORT || 3000;
const express    = require('express');
const socketIO = require('socket.io');
const app = express()
var server = http.createServer(app);
var io = socketIO(server)
app.use(express.static(publicPath))



io.on('connection', (socket)=>{
  console.log("New user connected");
  socket.emit('newMessage',{
     from: "user1",
     text: "hello!",
     createdAt:123
   });

   socket.on('createMessage', (newMessage)=>{
     console.log('created message',newMessage);
   })

  socket.on('disconnect',()=>{
    console.log("User disconnected");
  })
})

server.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});
