const { Channels } = require('../models');

const assingChannelsToGuild = async (guild, channelsId) => {
  const channels = await checkExistManyChannels(channelsId);
  if (!channels) {
    const channels = await createManyChannels(channelsId);
    await guild.addChannels(channels);
    return channels;
  }
  await guild.addChannels(channels);
  return channels;
};

const checkExistManyChannels = async (channelsId) => {
  const channels = (
    await Promise.all(
      channelsId.map(async (channelId) => {
        const channel = await Channels.findByPk(channelId);
        return channel;
      }),
    )
  ).filter((channel) => channel);
  if (channels.length === 0) {
    return false;
  } else if (channels.length !== channelsId.length) {
    const channels = await createManyChannels(
      channelsId.filter((channelId) => !channelsId.includes(channelId)),
    );
    return channels;
  }
  return channels;
};

const createManyChannels = async (channelsId) => {
  const channels = await Channels.bulkCreate(
    channelsId.map((channelId) => ({
      id: channelId,
    })),
  );
  return channels;
};

module.exports = {
  assingChannelsToGuild,
  checkExistManyChannels,
  createManyChannels,
};
