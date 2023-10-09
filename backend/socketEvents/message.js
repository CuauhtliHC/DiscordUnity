const { session } = require('../session/session');
const { getGuildChannels, getOnlineUsers } = require('../utils/discordUtils');

const handleMessage = async (message, socket) => {
  try {
    const data = JSON.parse(message);
    if (data.message === 'getChannels' && data.guildID) {
      const channels = await getGuildChannels(data.guildID);
      const { channelData, usersOnline } = getOnlineUsers(channels);

      session[data.userID] = {
        socket,
        guildID: data.guildID,
      };

      socket.send(
        JSON.stringify({
          channels: channelData,
          usersOnline,
          type: 'channels',
        }),
      );
    }
  } catch (error) {
    console.error('Error al obtener los canales:', error);
  }
};

module.exports = { handleMessage };
