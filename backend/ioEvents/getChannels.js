const { io } = require('../server');
const { getGuildChannels } = require('../discordApi');
const { getOnlineUsers } = require('../utils/discordUtils');
const { getDataOfGuild } = require('../services');

const responseGetChannels = async (socket, data) => {
  const { userID, guildID } = data;
  const socketsInRoom = await io.in(guildID).fetchSockets();
  const dataChannels = await getDataOfGuild(guildID);
  const sockets = await io.fetchSockets();
  const oldSocket = sockets.find(
    (socketArray) => socketArray.data.userId === userID,
  );
  // Desconnection of old socket
  if (oldSocket) {
    oldSocket.emit(
      'closeReason',
      'It has opened another instance with your user, you can only have one at a time',
    );
    oldSocket.disconnect();
  }
  const channels = await getGuildChannels(guildID);
  const { channelData } = getOnlineUsers(channels, socketsInRoom, dataChannels);
  socket.data.userId = data.userID;
  socket.join(guildID);
  socket.emit('getChannels', {
    channels: channelData,
  });
};

module.exports = { responseGetChannels };
