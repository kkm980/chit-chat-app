const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const msgObj = require("./client/script/userObj");

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require("./client/script/allUsers");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// linking the client folder
app.use(express.static(path.join(__dirname, 'client')));


const chatBot= 'chit-chat';
// whenever a user connects --->
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // send the message to the user who joins .emit-> only the target user(electricity bill)
    socket.emit('message', msgObj(chatBot, 'you joined the chat'));

    // send all other users a message that someone joined. .broadcast sends msg to everyone except the event emitter(tax payers money)
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        msgObj(chatBot, `${user.username} just joined the room`)
      );

    // all the users list and room name send
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // send the new chat message. socket.on sends msg to everyone(democracy)
  socket.on('chatMessage', msg => {
      
    const user = getCurrentUser(socket.id);
    // io.to(user.room).emit('message', msgObj(user.username, msg));

    // send msg to the user as "you sent msg" 
    socket.emit('message', msgObj("you",msg));

    //  send all other users the msg with the name of user who actually sent the message 
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        msgObj(user.username, msg)
      );
  });

  // whenever a user leaves-->
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        msgObj(chatBot, `${user.username} has left the room`)
      );

      // sending the users list and room name
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const port = process.env.PORT||5000;

server.listen(port, () =>
 console.log(`Server running`)
);
