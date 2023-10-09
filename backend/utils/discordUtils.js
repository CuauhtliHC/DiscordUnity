const { client } = require('../discordbot/botOn.js');

const getGuildChannels = async (guildId) => {
  try {
    const guild = await client.guilds.fetch(guildId);
    const channels = guild.channels.cache;
    return channels;
  } catch (error) {
    console.error('Error al obtener los canales:', error);
    throw error;
  }
};

const getOnlineUsers = (channels) => {
  const channelData = [];
  const usersOnline = [];

  channels
    .filter((channel) => channel.type === 2)
    .forEach((voiceChannel) => {
      const connectedMembers = voiceChannel.members;
      if (connectedMembers.size > 0) {
        const usersInChannel = connectedMembers.map((member) => {
          return { userID: member.user.id, userName: member.user.username };
        });
        usersOnline.push({
          channelName: voiceChannel.name,
          channelId: voiceChannel.id,
          users: usersInChannel,
        });
      }
    });

  channels
    .filter((channel) => channel.type === 2)
    .forEach((channel) => {
      channelData.push({
        id: channel.id,
        name: channel.name,
      });
    });

  return { channelData, usersOnline };
};

module.exports = { getGuildChannels, getOnlineUsers };
