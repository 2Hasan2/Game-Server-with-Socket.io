const express = require('express');
const path = require('path');
const app = express();
const port = 5500;

const server = require('http').createServer(app);

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, 'client')));

// Error handling for invalid routes
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});


// socket.io
const io = require('socket.io')(server, {});


const Game = require('./Classes/Game');
const Player = require('./Classes/Player');

const Colors = ['red', 'blue', 'green', 'yellow', 'pink', 'orange'];


const game = new Game([], []);
const W = H = 20;



io.sockets.on('connection', function (socket) {

    connect(io, socket);
    // connect


    // update the client player position
    socket.on('position', (data) => {
        update(io, socket, data);
    });

    // send data to client
    update(io, socket, null);


    // disconnect
    socket.on('disconnect', () => { disconnect(io, socket) });
})

// connect function
function connect(io, socket) {
    if (game.playersCount == Colors.length) {
        socket.emit('not_connected', { message: 'room is full' });
        return;
    };
    // add player
    let color = Colors[game.playersCount];
    game.addPlayer(new Player(socket.id, 0, 0, W, H, color, game.playersCount + 1));
    console.log(`player ${socket.id} connected`, game.playersCount);
}

// disconnect function
function disconnect(io, socket) {
    game.removePlayer(socket);
    io.sockets.emit('update', game.players);
    console.log(`player ${socket.id} disconnected`, game.playersCount);
}


// update function
function update(io, socket, data) {
    if (data) {
        game.players.forEach(player => {
            if (player.id === socket.id) {
                player.update(data.dx, data.dy);
            }
        });
    };
    io.sockets.emit('update', game.players);
}