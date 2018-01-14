const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname,"../public");
const port = process.env.PORT || 3000;
const express    = require('express');
const socketIO = require('socket.io');
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var {generateMessage} = require('./utils/message.js');

app.use(express.static(publicPath))


io.on('connection', (socket)=>{
  console.log("New user connected");

  socket.emit('newMessage',generateMessage("Admin", "Welcome to chat app"));

  // socket.emit('newMessage',generateMessage("user1","hello!"));

  socket.broadcast.emit('newMessage',generateMessage("Admin", "New user joined"));

  socket.on('createMessage', (message)=>{
      console.log('created message',message);
      io.emit('newMessage',generateMessage(message.from, message.text))
   })

  socket.on('disconnect',()=>{
    console.log("User disconnected");
  })
})

server.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});
