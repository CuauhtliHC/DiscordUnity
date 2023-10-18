const { io } = require('../server');
const { getGuildChannels } = require('../discordApi');
const { getOnlineUsers } = require('../utils/discordUtils');

const responseGetChannels = async (socket, data) => {
  const sockets = await io.fetchSockets();
  const oldSocket = sockets.find(
    (socket) => socket.data.userId === data.userID,
  );
  if (oldSocket) {
    oldSocket.emit(
      'closeReason',
      'It has opened another instance with your user, you can only have one at a time',
    );
    oldSocket.disconnect();
  }

  socket.data.userId = data.userID;
  socket.join(data.guildID);

  const channels = await getGuildChannels(data.guildID);
  const { channelData, usersOnline } = getOnlineUsers(channels);

  socket.emit('getChannels', {
    channels: channelData,
    usersOnline,
  });
};

module.exports = { responseGetChannels };
