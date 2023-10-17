const { io } = require('../server.js');

const voiceStateUpdateIo = (oldState, newState) => {
  const { guild, member } = newState;
  const { channel: newChannel } = newState;
  const { channel: oldChannel } = oldState;

  if (newChannel && !oldChannel) {
    io.to(guild.id).emit('userJoinChannel', {
      userName: member.user.tag,
      userId: member.user.id,
      channelName: newChannel.name,
      channelId: newChannel.id,
    });
  }

  if (oldChannel && !newChannel) {
    io.to(guild.id).emit('userLeftChannel', {
      userName: member.user.tag,
      userId: member.user.id,
      channelName: oldChannel.name,
      channelId: oldChannel.id,
    });
  }
  if (oldChannel && newChannel && oldChannel !== newChannel.id) {
    io.to(guild.id).emit('userSwitchedChannel', {
      userName: member.user.tag,
      userId: member.user.id,
      channelName: newChannel.name,
      channelId: newChannel.id,
    });
  }
};

module.exports = { voiceStateUpdateIo };
