const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname,"../public");
const port = process.env.PORT || 3000;
const express    = require('express');
const socketIO = require('socket.io');
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var {generateMessage, generateLocationMessage} = require('./utils/message.js');
var {isRealString} = require('./utils/validation.js')
var {Users} = require("./utils/users")
var users = new Users();

app.use(express.static(publicPath))


io.on('connection', (socket)=>{
  console.log("New user connected");


  socket.on('join',(params,callback)=>{
    if (!isRealString(params.name) || !isRealString(params.room)){
      return callback("Name and room are required")
    }

    socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();
  })

  socket.on('createMessage', (message, callback)=>{
      console.log('created message',message);
      io.emit('newMessage',generateMessage(message.from, message.text))
      callback("This is from the server");
   })

   socket.on('createLocationMessage',(coords)=>{
     io.emit('newLocationMessage',  generateLocationMessage('Admin', coords.latitude, coords.longitude));
   })
  socket.on('disconnect',()=>{
    var user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit("updateUserList",users.getUserList(user.room));
      io.to(user.room).emit("newMessage",generateMessage("Admin", `${user.name} has left the room`));
    }
  })
})

server.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});
