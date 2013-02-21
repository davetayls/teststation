/**
 * Module Dependencies
 */
var express = require('express'),
	sio = require('socket.io');

/**
 * Create app
 */
var app = express.createServer(
	express.bodyParser(),
	express.static('public')
);

/**
 * Listen
 */
 app.listen(3000);

 /**
  * Socket.io
  */
var io = sio.listen(app);

io.sockets.on('connection', function(socket){
	console.log('Someone connected');
});
