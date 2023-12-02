const {
  assingChannelsToGuild,
  getAllChannelsOfGuild,
} = require('./serviceChannels');
const {
  assingCoordinatesToChannel,
  checkExistCoordinateInChannel,
  getAllOfCoordinates,
} = require('./serviceCoordinates');
const { getOrCreateGuild } = require('./serviceGuild');

const proccessData = async (data, guildId, channelsId) => {
  const guild = await getOrCreateGuild(guildId);
  if (guild) {
    const channels = await assingChannelsToGuild(guild, channelsId);
    assingCoordinatesToChannel(channels, data);
  }
};

const getDataOfGuild = async (guildId) => {
  const guild = await getOrCreateGuild(guildId);
  const channels = await getAllChannelsOfGuild(guild.id);
  const coordinates = await Promise.all(
    channels.map(async (channel) => {
      const dataChannel = await getAllOfCoordinates(channel);
      return { [channel.id]: dataChannel };
    }),
  );
  return coordinates;
};

module.exports = { proccessData, getDataOfGuild };
