const { assingChannelsToGuild } = require('./serviceChannels');
const { assingCoordinatesToChannel } = require('./serviceCoordinates');
const { getOrCreateGuild } = require('./serviceGuild');

const proccessData = async (data, guildId, channelsId) => {
  const guild = await getOrCreateGuild(guildId);
  if (guild) {
    const channels = await assingChannelsToGuild(guild, channelsId);
    assingCoordinatesToChannel(channels, data);
  }
};

module.exports = { proccessData };
