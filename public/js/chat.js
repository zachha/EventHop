// alert("Test Working");

// Considered socket.io client setup

// Make connection

var socket = io.connect('http://localhost:8080');

// Query DOM

var ioMessage = document.getElementById('ioMessage');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// Emit events

btn.addEventListener('click', function() {
	socket.emit('chat', {
		ioMessage: ioMessage.value,
		handle: handle.value
	});
	// ioMessage.text = "";
});

ioMessage.addEventListener('keypress', function() {
	socket.emit('typing',handle.value);
});

// btn.addEventListener('click', function() {
// 	ioMessage.innerHTML = "";
// }

// Listen for events

socket.on('chat', function(data) {
	feedback.innerHTML = "";
	output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.ioMessage + '</p>';
});

socket.on('typing', function(data) {
	feedback.innerHTML = '<p><em>' + data + ' is typing a message ... </em></p>';
});

$('button').click(function() {
	$('#ioMessage').val("");
});
