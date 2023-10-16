const { session } = require('../session/session.js');
const { io } = require('../server.js');

const voiceStateUpdate = (oldState, newState) => {
  const guild = newState.guild;
  const member = newState.member;

  if (newState.channel && !oldState.channel) {
    for (const userId in session) {
      if (session[userId].guildID === guild.id) {
        console.log(
          `${member.user.tag} se unió al canal de voz ${newState.channel.name}`,
        );
        const userSocket = session[userId].socket;
        userSocket.send(
          JSON.stringify({
            userName: member.user.tag,
            userId: member.user.id,
            channelName: newState.channel.name,
            channelId: newState.channel.id,
            type: 'userJoinChannel',
          }),
        );
      }
    }
  }

  if (oldState.channel && !newState.channel) {
    for (const userId in session) {
      if (session[userId].guildID === guild.id) {
        console.log(
          `${member.user.tag} se desconectó del canal de voz ${oldState.channel.name}`,
        );
        const userSocket = session[userId].socket;
        userSocket.send(
          JSON.stringify({
            userName: member.user.tag,
            userId: member.user.id,
            channelName: oldState.channel.name,
            channelId: oldState.channel.id,
            type: 'userLeftChannel',
          }),
        );
      }
    }
  }
  if (
    oldState.channel &&
    newState.channel &&
    oldState.channel.id !== newState.channel.id
  ) {
    console.log(
      `${member.user.tag} cambió del canal de voz ${oldState.channel.name} al canal ${newState.channel.name}`,
    );
    const userSocket = session[member.user.id]?.socket;
    if (userSocket) {
      userSocket.send(
        JSON.stringify({
          userName: member.user.tag,
          userId: member.user.id,
          channelName: newState.channel.name,
          channelId: newState.channel.id,
          type: 'userSwitchedChannel',
        }),
      );
    }
  }
};

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

module.exports = { voiceStateUpdate, voiceStateUpdateIo };
