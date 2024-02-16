const { Server } = require('socket.io');

const io = new Server({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.listen(8080);

module.exports = { io };
