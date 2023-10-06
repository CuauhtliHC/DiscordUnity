const { session } = require('../session/session');
const { getGuildChannels, getOnlineUsers } = require('../utils/discordUtils');

const messageEvent = async (message, socket) => {
  try {
    const data = JSON.parse(message);
    if (data.message === 'getChannels' && data.guildID) {
      session[data.userID] = {
        socket: socket,
        guildID: data.guildID,
      };
      try {
        const channels = await getGuildChannels(data.guildID);
        const { channelData, usersOnline } = getOnlineUsers(channels);

        socket.send(
          JSON.stringify({
            channels: channelData,
            usersOnline,
            type: 'channels',
          }),
        );
      } catch (error) {
        console.error('Error al obtener los canales:', error);
      }
    }
  } catch (error) {
    console.error('Error al analizar el mensaje WebSocket:', error);
  }
};

module.exports = { messageEvent };
