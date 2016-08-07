var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/src/index.html');
});

server.listen(8080);

var numClients = 0;

io.on('connection', function (socket) {
    numClients++;
    io.sockets.emit('stats', { numClients: numClients });

    console.log('Connected clients:', numClients);

    socket.on('disconnect', function () {
        numClients--;
        //socket.emit('stats', { numClients: numClients });
        //socket.broadcast.emit('stats', { numClients: numClients });
        io.sockets.emit('stats', { numClients: numClients });

        console.log('Connected clients:', numClients);
    });

    socket.on('event', function (data) {
        console.log('A client sent us this dumb message:', data.message);
        io.sockets.emit('event', { message: data.message });
    })
});