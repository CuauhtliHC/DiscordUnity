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
  if (oldSocket) {
    oldSocket.emit(
      'closeReason',
      'It has opened another instance with your user, you can only have one at a time',
    );
    oldSocket.disconnect();
  }
  const channels = await getGuildChannels(data.guildID);
  const { channelData, usersOnline } = getOnlineUsers(
    channels,
    socketsInRoom,
    dataChannels,
  );
  console.log(channelData);
  console.log(usersOnline);
  socket.data.userId = data.userID;
  socket.join(data.guildID);
  socket.emit('getChannels', {
    channels: channelData,
    usersOnline,
  });
};

module.exports = { responseGetChannels };
