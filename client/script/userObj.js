const moment = require('moment');

function msgSatchet(user, msg){
    return {
        name: user,
        msg:msg,
        time:moment().format('h:mm a')
    }
}

module.exports = msgSatchet;