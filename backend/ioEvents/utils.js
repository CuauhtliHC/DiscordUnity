const { io } = require('../serverIO');

const checkUserInRoom = async (userID) => {
  const sockets = await io.fetchSockets();
  const userSocket = sockets.find(
    (socketArray) => socketArray.data.userId === userID,
  );
  return userSocket;
};

module.exports = { checkUserInRoom };
