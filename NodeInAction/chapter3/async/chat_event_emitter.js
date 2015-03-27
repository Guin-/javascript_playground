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

channel.on('leave', function(id){
    channel.removeListener(
        'broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, id + ' has left the chat\n');
});

// Causes channel participants to be kicked off of the chat
//  But it does not shut down the server
channel.on('shutdown', function() {
    channel.emit('broadcast', '', 'Channel has been shut down\n');
    channel.removeAllListeners('broadcast');
});

// Display count of currently connected users and set max listeners
channel.on('join', function(id, client) {
    var welcome = 'Welcome\n'
                + 'Guests online: ' + channel.listeners('broadcast').length;
    client.write(welcome + '\n');
    // Node displays a warning when there are
    // more than 10 listeners on an event emitter.
    channel.setMaxListeners(50);
});



var server = net.createServer(function(client) {
    var id = client.remoteAddress + ':' + client.remotePort;
    client.on('connect', function() {
        console.log('join');
        channel.emit('join', id, client);
    });

    client.on('data', function(data) {
        data = data.toString();
        if (data == "shutdown\r\n") {
            channel.emit('shutdown');
        }
        channel.emit('broadcast', id, data);
    });

    client.on('close', function() {
        channel.emit('leave', id);
    });
});

server.listen(8888);


