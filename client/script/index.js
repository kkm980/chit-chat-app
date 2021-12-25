const socket =io();


// here msg is the event and incoming is the message coming from socketio server upon any client addition or leave
socket.on('msg', incoming=>{console.log(incoming)})