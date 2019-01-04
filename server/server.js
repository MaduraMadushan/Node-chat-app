const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000
var app = express();
var sever = http.createServer(app);
var io = socketIO(sever);

app.use(express.static(publicPath));

io.on('connection',(socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcom to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');

        socket.on('createLocationMessage', (coord) => {
            io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coord.longitude));
        });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

sever.listen(port , () => {
    console.log('Server is up on port ' + port);
});