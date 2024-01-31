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

const proccessData = async (data, guildId, channelsId, dataType) => {
  const guild = await getOrCreateGuild(guildId);
  if (guild) {
    const channels = await assingChannelsToGuild(guild, channelsId);
    assingCoordinatesToChannel(channels, data, dataType);
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
  return coordinates.reduce((obj, item) => {
    const [key, value] = Object.entries(item)[0];
    obj[key] = value;
    return obj;
  }, {});
};

module.exports = { proccessData, getDataOfGuild };
