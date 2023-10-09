const { closeConnection } = require('./close');
const { handleMessage } = require('./message');

const handleSocketConnection = async (socket) => {
  console.log('New connection');
  socket.on('message', async (message) => {
    await handleMessage(Buffer.from(message).toString(), socket);
  });

  socket.on('close', closeConnection(socket));
};

module.exports = { handleSocketConnection };
