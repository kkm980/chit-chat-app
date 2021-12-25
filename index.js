const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');

const app = express();

const server = http.createServer(app);
 
const socketServer = socket(server);

app.use(express.static(path.join(__dirname, 'client')));


// Function triggers whenever any user gets added

socketServer.on('connection', event=>{
    console.log("event occured");
})

const port =3000;

server.listen(port, ()=>{console.log("listening")});