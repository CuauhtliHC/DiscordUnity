const getOnlineUsers = (channels, socketsInRoom, dataChannels) => {
  const channelData = [];
  const usersOnline = [];

  const voiceChannels = channels.filter((channel) => channel.type === 2);

  voiceChannels.forEach((voiceChannel) => {
    const connectedMembers = voiceChannel.members;
    if (connectedMembers.size > 0) {
      const usersInChannel = connectedMembers.map((member) => {
        const socketFound = socketsInRoom.find(
          (s) => s.data.userId === member.user.id,
        );
        return {
          userID: member.user.id,
          userName: member.user.username,
          positionX: socketFound?.data.positionX || null,
          positionY: socketFound?.data.positionY || null,
        };
      });
      usersOnline.push({
        channelName: voiceChannel.name,
        channelId: voiceChannel.id,
        users: usersInChannel,
      });
    }
    channelData.push({
      id: voiceChannel.id,
      name: voiceChannel.name,
      coordinatesArray: dataChannels[voiceChannel.id] ?? null,
    });
  });

  return { channelData, usersOnline };
};

module.exports = { getOnlineUsers };
