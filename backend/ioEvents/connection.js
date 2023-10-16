const { responseGetChannels } = require('./getChannels');

const handleIoConnection = (socket) => {
  console.log('New connection');
  socket.on('getChannels', async (data) => {
    await responseGetChannels(socket, data);
  });
  socket.on('disconnect', () => {
    console.log('Close connection');
    socket.leave();
  });
};

module.exports = { handleIoConnection };
