const { Guilds } = require('../models');

const getOrCreateGuild = async (guildId) => {
  const guild = await checkExistGuild(guildId);
  if (!guild) {
    const guild = await createGuild(guildId);
    return guild;
  }
  return guild;
};

const checkExistGuild = async (guildId) => {
  const guild = await Guilds.findByPk(guildId);
  if (!guild) {
    return false;
  }
  return guild;
};

const createGuild = async (guildId) => {
  const guild = await Guilds.create({
    id: guildId,
  });
  return guild;
};

module.exports = { getOrCreateGuild, checkExistGuild, createGuild };
