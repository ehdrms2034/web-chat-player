const socketio = require('socket.io');

module.exports = (server) => {
    const io = socketio(server);

    io.on('connect', (socket) => {
        console.log('socket.io connected!');

        socket.on('join', (video) => {
            console.log('socket join!');
            console.log('video: ', video);
            
            socket.join(video);
        });

        socket.on('newComment', (data, callback) => {
            console.log('socket newComment!');
            console.log(data);

            io.to(data.video).emit('newMessage', { id: data.id, text: data.message, createdAt: data.createdAt, timeline: data.timeline });
            callback();
        });

        socket.on('disconnect', () => {
            console.log('socket.io disconnected!');
        });
    });
}