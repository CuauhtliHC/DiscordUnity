const { proccessData } = require('../services');

const responseUpdateGuild = async (socket, data) => {
  const channelsId = Object.keys(data).map((channelId) => BigInt(channelId));
  const room = Array.from(socket.rooms)[1];
  socket.broadcast.to(room).emit('updateGuild', data);
  await proccessData(data, room, channelsId);
};

module.exports = { responseUpdateGuild };
