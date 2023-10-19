const { stringToVecto2 } = require('../utils/convertVectors');

const responsePlayerMovement = async (socket, data) => {
  const { userID, targetPosition } = data;
  const socketRoomsSet = socket.rooms;
  const socketRoomsArray = Array.from(socketRoomsSet);
  const room = socketRoomsArray[1];
  const { targetPositionX, targetPositionY } = stringToVecto2(targetPosition);
  socket.data.positionX = targetPositionX;
  socket.data.positionY = targetPositionY;
  socket.broadcast.to(room).emit('playerMovement', {
    userID,
    targetPositionX: targetPositionX,
    targetPositionY: targetPositionY,
  });
};

module.exports = { responsePlayerMovement };
