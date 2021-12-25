const chatInput = document.getElementById("chatInput");
const msgBox = document.getElementById("msgBox");

const socket =io();


// here msg is the event and incoming is the message coming from socketio server upon any client addition or leave or messaging
socket.on('msg', incoming=>{
    renderMsg(incoming);
    msgBox.scrollTop = msgBox.scrollHeight;
    
})


// function that triggers when user sends any message
chatInput.addEventListener('submit',(e)=>{

    // to stop the default behaviour of form submission
    e.preventDefault();

    // emits the message to the server 
    socket.emit('newMsg', e.target.elements.inpBox.value);

    e.target.elements.inpBox.value="";
    e.target.elements.inpBox.focus();
})


// appending the incoming message to client side 

function renderMsg(incoming){
   
    const div=document.createElement('div');
    div.innerHTML = `
    <p>${incoming}</p>`;
     msgBox.appendChild(div);
}