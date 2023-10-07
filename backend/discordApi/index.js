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

const checkBotThere = async (guildId) => {
  try {
    const guild = client.guilds.cache.find((g) => g.id === guildId);
    if (guild) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getGuildChannels,
  checkBotThere,
};
