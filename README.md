# Chat App
## App name- chit-chat App

## deployed link- 

## Tech stack used- HTML, CSS, JS, Socket.io
### libraries used- Express, Nodemon, moment, socket.io

### User flow- User first enters on landing page, Enters his name, selects one chat room out of two available rooms and enters in that room. Starts chatting, clicks on leave button to leave the room

### Features implemented- 
   - Live chat
   - Maintenance of chat state for more than one chat room
   - Show message with the time when it was sent
   - Self sent message appears in right and other users message is at left
   - Automatically scroll down to the new message
   - At any time find the names of all users currently there in user's chat room
   - Every message appears differently for the user who sends a message and the users who receive that message
   - Notify every user in that room when a user joins with his name, for the joining user show the welcome message instead
   - Take prompt permission from the user after clicking on leave now
   - Once user actually leaves the chat room, show the leave message to every other users in that room

### Local setup instructions-
   - Clone this repo,
   - In the git terminal, go to the cloned directory
   - run npm install in git terminal
   - Once done, run npm run server command in terminal. You should see "listening" message in terminal once the server connects successfully
   - Then go to the google chrome browser and type localhost:5000 in search bar and press enter. You will see the landing page of our app.

### Problem statement- https://docs.google.com/document/d/1ed5yBRw-eIrucDHz1yxNMLkUiyWBhVgE/edit?rtpof=true&sd=true
