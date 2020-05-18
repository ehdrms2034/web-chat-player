const socketio = require('socket.io');

module.exports = (server) => {
    const io = socketio(server);

    io.on('connect', (socket) => {
        console.log('socket.io connected!');

        socket.on('disconnect', () => {
            console.log('socket.io disconnected!');
        });
    });
}