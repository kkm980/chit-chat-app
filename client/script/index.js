

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// getting room name and username

const { username, room } = Qs.parse(location.search,
{
  ignoreQueryPrefix: true,
});

const socket = io();

// function triggers when someone joins the room

socket.emit('joinRoom',
 { username, room }
);

// getting users and room name

socket.on('roomUsers', ({ room, users })=>{
  outputRoomName(room);
  outputUsers(users);
});


// receiving the message from socket server

socket.on('message',(message)=>{
  outputMessage(message);

  // Scroll down automatically when someone joins
  chatMessages.scrollTop = chatMessages.scrollHeight;

});

// function calls upon clicking the send button
chatForm.addEventListener('submit',(e)=>
{
  e.preventDefault();

  // getting message

  let msg = e.target.elements.msg.value; 
  
  //   if the message is trailing spaces, do nothing 
  msg = msg.trim();
  if (!msg){
    return false;
  }

  // sending the message to socket server
  socket.emit('chatMessage', msg);

  // upon sending the message, input box value is empty string
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// adding the room name dynamically to the dom
function outputRoomName(room) {
  roomName.innerText = room;
}

// appending the available users in the room to dom
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//throw alert when user clicks on leave the room in form of prompt to take final permission from user

document.getElementById('leave-btn').addEventListener('click', () =>
{
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
}
);