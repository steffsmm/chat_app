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

// app.get('/', function(req, res){
//     res.send(`${publicPath}\\index.html`);
// });

io.on('connection', (socket)=>{
  console.log("New user connected");

  socket.on('disconnect',()=>{
    console.log("User disconnected");
  })
})

server.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});
