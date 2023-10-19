const getOnlineUsers = (channels, socketsInRoom) => {
  const channelData = [];
  const usersOnline = [];

  channels
    .filter((channel) => channel.type === 2)
    .forEach((voiceChannel) => {
      const connectedMembers = voiceChannel.members;
      if (connectedMembers.size > 0) {
        const usersInChannel = connectedMembers.map((member) => {
          const socketFound = socketsInRoom.find(
            (s) => s.data.userId === member.user.id,
          );
          const positionX =
            !socketFound || !socketFound.data.positionX
              ? null
              : socketFound.data.positionX;
          const positionY =
            !socketFound || !socketFound.data.positionY
              ? null
              : socketFound.data.positionY;
          return {
            userID: member.user.id,
            userName: member.user.username,
            positionX,
            positionY,
          };
        });
        usersOnline.push({
          channelName: voiceChannel.name,
          channelId: voiceChannel.id,
          users: usersInChannel,
        });
      }
    });

  channels
    .filter((channel) => channel.type === 2)
    .forEach((channel) => {
      channelData.push({
        id: channel.id,
        name: channel.name,
      });
    });

  return { channelData, usersOnline };
};

module.exports = { getOnlineUsers };
