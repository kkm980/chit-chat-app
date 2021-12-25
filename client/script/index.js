const chatInput = document.getElementById("chatInput");

const socket =io();


// here msg is the event and incoming is the message coming from socketio server upon any client addition or leave
socket.on('msg', incoming=>{console.log(incoming)})


// function that triggers when user sends any message
chatInput.addEventListener('submit',(e)=>{

    // to stop the default behaviour of form submission
    e.preventDefault();

    // emits the message to the server 
    socket.emit('newMsg', e.target.elements.inpBox.value);
})