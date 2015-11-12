var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var poll = {
  "yes": 0,
  "no": 0,
  "maybe": 0
}

server.listen(1337);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('send', function (data) {
    poll[data]++;
    console.log(data + " " + poll[data]);

    socket.emit('poll', poll);
  });

  socket.on('poll-request', function (data) {
    socket.emit('poll', poll);
  });
});

/*io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});*/
