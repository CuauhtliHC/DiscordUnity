const { client } = require('../discordbot/botOn');

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

module.exports = {
  getGuildChannels,
};
