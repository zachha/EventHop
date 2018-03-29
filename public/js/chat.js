// alert("Test Working");

// Considered socket.io client setup

// Make connection

var socket = io.connect('http://localhost:4000');

// Query DOM

var message01 = document.getElementById('message01');
var message02 = document.getElementById('message02');
var handle01 = document.getElementById('handle01');
var handle02 = document.getElementById('handle02');
var btn01 = document.getElementById('send01');
var btn02 = document.getElementById('send02');
var output01 = document.getElementById('output01');
var output02 = document.getElementById('output02');
var feedback01 = document.getElementById('feedback01');
var feedback02 = document.getElementById('feedback02');

/////////////////////////////////////////////////////
// Chatroom 01

// Emit events 01

btn01.addEventListener('click', function() {
	socket.emit('chat01', {
		message01: message01.value,
		handle01: handle01.value
	});
});

message01.addEventListener('keypress', function() {
	socket.emit('typing01', handle01.value);
});

// Listen for events

socket.on('chat01', function(data) {
	feedback01.innerHTML = "";
	output01.innerHTML += '<p><strong>' + data.handle01 + ': </strong>' + data.message01 + '</p>';
});

socket.on('typing01', function(data) {
	feedback01.innerHTML = '<p><em>' + data + ' is typing a message ... </em></p>';
});

$('#send01').click(function() {
	$('#message01').val("");
});

/////////////////////////////////////////////////////
// Chatroom 02

// Emit events 02

btn02.addEventListener('click', function() {
	socket.emit('chat02', {
		message02: message02.value,
		handle02: handle02.value
	});
	// message02.text = "";
});

message02.addEventListener('keypress', function() {
	socket.emit('typing02',handle02.value);
});

// btn02.addEventListener('click', function() {
// 	message02.innerHTML = "";
// }

// Listen for events 02

socket.on('chat02', function(data) {
	feedback02.innerHTML = "";
	output02.innerHTML += '<p><strong>' + data.handle02 + ': </strong>' + data.message02 + '</p>';
});

socket.on('typing02', function(data) {
	feedback02.innerHTML = '<p><em>' + data + ' is typing a message ... </em></p>';
});

$('#send02').click(function() {
	$('#message02').val("");
});

/////////////////////////////////////////////////////
// Chatroom 03






