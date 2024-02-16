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

const checkBotThere = (guildId) => {
  try {
    const listGuild = client.guilds.cache;
    return listGuild.find((g) => g.id === guildId) ? true : false;
  } catch (error) {
    console.log(error);
  }
};

const checkUserConnectChannel = async (idUser, listGuilds) => {
  const idGuild = listGuilds
    .filter((guild) => checkBotThere(guild.id))
    .find((guild) => {
      const guildCache = client.guilds.cache.get(guild.id);
      const member = guildCache.members.cache.get(idUser);
      return member !== undefined;
    });
  const user = client.users.cache.get(idUser);
};

module.exports = {
  getGuildChannels,
  checkBotThere,
  checkUserConnectChannel,
};
