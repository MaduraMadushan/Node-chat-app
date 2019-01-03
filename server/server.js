const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000
var app = express();
var sever = http.createServer(app);
var io = socketIO(sever);

app.use(express.static(publicPath));

io.on('connection',(socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

sever.listen(port , () => {
    console.log('Server is up on port ' + port);
});