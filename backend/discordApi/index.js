const { client } = require('../discordbot/botOn');

const fetchGuild = async (guildId) => {
  try {
    return await client.guilds.fetch(guildId);
  } catch (error) {
    console.error('Error al obtener los canales:', error);
    throw error;
  }
};

const getGuildChannels = async (guildId) => {
  const guild = await fetchGuild(guildId);
  return guild.channels.cache;
};

const checkBotThere = async (guildId) => {
  try {
    return Boolean(client.guilds.cache.find((g) => g.id === guildId));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getGuildChannels,
  checkBotThere,
};
