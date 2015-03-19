var net = require('net');

var server = net.createServer(function(socket) {
    socket.on('data', function(data) {
        socket.write(data);
    });
});

server.listen(8888);

// use socket.once('data', handleData) to only echo the first chunk of data sent to it
