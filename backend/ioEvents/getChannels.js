const { io } = require('../server');
const { getGuildChannels } = require('../discordApi');
const { getOnlineUsers } = require('../utils/discordUtils');
const { getDataOfGuild } = require('../services');

const responseGetChannels = async (socket, data) => {
  const socketsInRoom = await io.in(data.guildID).fetchSockets();
  const dataChannels = await getDataOfGuild(data.guildID);
  const sockets = await io.fetchSockets();
  const oldSocket = sockets.find(
    (socketArray) => socketArray.data.userId === data.userID,
  );
  if (oldSocket) {
    oldSocket.emit(
      'closeReason',
      'It has opened another instance with your user, you can only have one at a time',
    );
    oldSocket.disconnect();
  }
  const channels = await getGuildChannels(data.guildID);
  const { channelData, usersOnline } = getOnlineUsers(channels, socketsInRoom);
  socket.data.userId = data.userID;
  socket.join(data.guildID);
  socket.emit('getChannels', {
    channels: channelData,
    usersOnline,
    dataDB: dataChannels.length === 0 ? null : dataChannels,
  });
};

module.exports = { responseGetChannels };
