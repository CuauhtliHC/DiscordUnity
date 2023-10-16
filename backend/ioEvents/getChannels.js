const { getGuildChannels } = require('../discordApi');
const { getOnlineUsers } = require('../utils/discordUtils');

const responseGetChannels = async (socket, data) => {
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
