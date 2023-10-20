const { stringToVecto2 } = require('../utils/convertVectors');

const responsePlayerMovement = async (socket, data) => {
  const { userID, targetPosition } = data;
  const room = Array.from(socket.rooms)[1];
  const { targetPositionX, targetPositionY } = stringToVecto2(targetPosition);
  Object.assign(socket.data, {
    positionX: targetPositionX,
    positionY: targetPositionY,
  });
  socket.broadcast.to(room).emit('playerMovement', {
    userID,
    targetPositionX,
    targetPositionY,
  });
};

module.exports = { responsePlayerMovement };
