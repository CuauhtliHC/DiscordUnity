const { handleSocketDisconnect } = require('./disconnect');
const { responseGetChannels } = require('./getChannels');
const { responsePlayerMovement } = require('./playerMovement');

const handleIoConnection = (socket) => {
  console.log('New connection socket io');
  socket.on('getChannels', async (data) => {
    await responseGetChannels(socket, data);
  });
  socket.on('playerMovement', async (data) => {
    await responsePlayerMovement(socket, data);
  });
  socket.on('updateGuild', async (data) => {
    console.log(data);
  });
  socket.on('disconnecting', () => {
    handleSocketDisconnect(socket);
  });
};

module.exports = { handleIoConnection };
