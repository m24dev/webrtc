var fs = require('fs');
var { PeerServer } = require('peer');

var server = PeerServer({
    port: 9000,
    path: '/peerjs',
    ssl: {
        key: fs.readFileSync('./snowpack.key', 'utf8'),
        cert: fs.readFileSync('./snowpack.crt', 'utf8')
    }
});

server.on('connection', (client) => {
    console.log('connect');
});

server.on('disconnect', (client) => {
    console.log('disconnect');
});