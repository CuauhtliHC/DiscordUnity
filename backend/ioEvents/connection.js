const { io } = require('../server');
const { responseGetChannels } = require('./getChannels');

const handleIoConnection = (socket) => {
  console.log('New connection socket io');
  socket.on('getChannels', async (data) => {
    await responseGetChannels(socket, data);
  });
  socket.on('playerMovement', async (data) => {
    const { userID, targetPosition } = data;
    const socketRoomsSet = socket.rooms;
    const socketRoomsArray = Array.from(socketRoomsSet);
    const room = socketRoomsArray[1];
    const [targetPositionX, targetPositionY] = targetPosition
      .replace('(', '')
      .replace(')', '')
      .split(',');
    socket.broadcast
      .to(room)
      .emit('playerMovement', {
        userID,
        targetPositionX: parseFloat(targetPositionX),
        targetPositionY: parseFloat(targetPositionY),
      });
  });
  socket.on('disconnect', () => {
    console.log('Close connection');
    socket.leave();
  });
};

module.exports = { handleIoConnection };
