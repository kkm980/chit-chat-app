const moment = require('moment');

function msgObj(username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}

module.exports = msgObj;
