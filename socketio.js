// Considered socket.io server setup

var express = require('express');
var socket = require('socket.io');

// App setup

var app = express();
var server = app.listen(4000, function() {
	console.log('listening for requests on port :4000');
});

// Static files

app.use(express.static('public'));

// Socket setup

var io = socket(server);

io.on('connection', function(socket) {
	console.log("made socket connection", socket.id);

/////////////////////////////////////////////////////
// Chatroom 01

// Handle event chat

socket.on('chat01', function(data) {
	io.sockets.emit('chat01', data);
});

socket.on('typing01', function(data) {
	socket.broadcast.emit('typing01', data);
});

/////////////////////////////////////////////////////
// Chatroom 02

// Handle event chat

socket.on('chat02', function(data) {
	io.sockets.emit('chat02', data);
});

socket.on('typing02', function(data) {
	socket.broadcast.emit('typing02', data);
});


});

/////////////////////////////////////////////////////
// Chatroom 03



