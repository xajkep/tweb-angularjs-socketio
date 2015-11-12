var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var poll = [0,0,0];

var bonjour="HELLO";

server.listen(1337);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('send', function (i) {
    poll[i]++;
    console.log(i + " " + poll[i]);

    socket.emit('poll', poll);
  });

  socket.on('poll-request', function (data) {
    socket.emit('poll', poll);
  });
});
