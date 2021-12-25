const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');
const msgSatchet = require("./client/script/userObj");
const app = express();

const server = http.createServer(app);
 
const socketServer = socket(server);

app.use(express.static(path.join(__dirname, 'client')));


// Function triggers whenever any user gets added

socketServer.on('connection', skt=>{

    // the first parameter in emit function is the message event and second parameter is the message which will actually be shown when client connects and disconnects which will be picked up in indexed.js file in client folder

    // to only client who triggers the event(electricity bill)--->
    skt.emit('msg', "welcome to the room");

    // to all clients except the client who is triggering the event(tax payers money)--->
    skt.broadcast.emit("msg", "someone joined");

    // to each and every client(democracy)--->
    //    socketServer.emit("msg", "you or someone else joined");
    
    // on disconnection, everyone must know that a particular user left the room

    skt.on('disconnect', ()=>{
        socketServer.emit('msg', "Someone left the room");
    })

    // receive new message 
     skt.on('newMsg', chat=>{
        // console.log(chat); 
        socketServer.emit('msg', chat);
     })
})

const port =process.env.PORT||5000;

server.listen(port, ()=>{console.log("listening")});