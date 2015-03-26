var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client) {
    channel.clients[id] = client;
    channel[id] =  function(senderId, message) {
        if (id != senderId) {
            channel.clients[id].write(message);
        }
    }
    channel.on('broadcast', channel.subscriptions[id]);
});

var server = net.createServer(function(client) {
    var id = client.remoteAddress + ':' + client.remotePort;
    client.on('connect', function() {
        console.log('join');
        channel.emit('join', id, client);
    });
    client.on('data', function(data) {
        data = data.toString();
        channel.emit('broadcast', id, data);
    });
});

server.listen(8888);



