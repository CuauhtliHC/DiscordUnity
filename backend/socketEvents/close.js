const { session } = require('../session/session');

const closeConnection = (socket) => {
  return (code, reason) => {
    const userIdToRemove = Object.keys(session).find(
      (userId) => session[userId].socket === socket,
    );
    if (userIdToRemove) {
      delete session[userIdToRemove];
      console.log(
        `Socket cerrado y eliminado para el usuario con ID: ${userIdToRemove}`,
      );
    } else {
      console.log(
        'Socket cerrado, pero no se encontró una entrada correspondiente en session',
      );
    }
  };
};

module.exports = { closeConnection };
