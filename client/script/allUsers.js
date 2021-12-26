const users = [];

// when user joins the chat

function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

// finding the current user from array
function getCurrentUser(id)
{
  return users.find(user => user.id === id);
}

// when any user leaves the chat
function userLeave(id) {
  const x = users.findIndex(user => user.id === id);
  if (x !== -1)
  {
    return users.splice(x, 1)[0];
  }
}

// specific users in that room
function getRoomUsers(room)
{
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
