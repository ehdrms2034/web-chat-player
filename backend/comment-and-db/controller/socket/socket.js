const socketio = require('socket.io');

module.exports = (server) => {
    const io = socketio(server);

    io.on('connect', (socket) => {
        console.log('socket.io connected!');

        socket.on('join', (video) => {
            console.log('socket join!');
            
            socket.join(video);
        });

        socket.on('newComment', (id, message, createdAt, timeline, video) => {
            console.log('socket newComment!');

            io.to(video).emit('newMessage', { id: id, message: message, createdAt: createdAt, timeline: timeline });
        });

        socket.on('disconnect', () => {
            console.log('socket.io disconnected!');
        });
    });
}