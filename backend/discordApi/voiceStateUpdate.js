const { io } = require('../serverIO.js');

const emitEvent = (guildId, eventName, member, channel) => {
  io.to(guildId).emit(eventName, {
    userName: member.user.tag,
    userId: member.user.id,
    channelName: channel.name,
    channelId: channel.id,
  });
};

const voiceStateUpdateIo = (oldState, newState) => {
  const { guild, member } = newState;
  const { channel: newChannel } = newState;
  const { channel: oldChannel } = oldState;

  if (newChannel && !oldChannel) {
    emitEvent(guild.id, 'userJoinChannel', member, newChannel);
  }

  if (oldChannel && !newChannel) {
    emitEvent(guild.id, 'userLeftChannel', member, oldChannel);
  }

  if (oldChannel && newChannel && oldChannel !== newChannel.id) {
    emitEvent(guild.id, 'userSwitchedChannel', member, newChannel);
  }
};

module.exports = { voiceStateUpdateIo };
