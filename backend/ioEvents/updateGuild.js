const { proccessData } = require('../services');

const responseUpdateGuild = async (socket, data) => {
  const room = Array.from(socket.rooms)[1];
  socket.broadcast.to(room).emit('updateGuild', data);
  for (let dataType in data) {
    if (
      data.hasOwnProperty(dataType) &&
      Object.keys(data[dataType]).length > 0
    ) {
      const channelsId = Object.keys(data[dataType]).map((channelId) =>
        BigInt(channelId),
      );
      await proccessData(data[dataType], room, channelsId, dataType);
    }
  }
};

module.exports = { responseUpdateGuild };
