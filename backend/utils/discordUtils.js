const getOnlineUsers = (channels, socketsInRoom, dataChannels) => {
  const channelData = channels
    .filter((channel) => channel.type === 2)
    .map((voiceChannel) => {
      const connectedMembers = voiceChannel.members;
      const usersInChannel =
        connectedMembers.size > 0
          ? connectedMembers.map((member) => {
              const socketFound = socketsInRoom.find(
                (s) => s.data.userId === member.user.id,
              );
              return {
                channelName: voiceChannel.name,
                channelId: voiceChannel.id,
                userID: member.user.id,
                userName: member.user.username,
                positionX: socketFound?.data.positionX || null,
                positionY: socketFound?.data.positionY || null,
              };
            })
          : null;
      return {
        id: voiceChannel.id,
        name: voiceChannel.name,
        coordinatesArray: dataChannels[voiceChannel.id] ?? null,
        users: usersInChannel,
      };
    });

  return { channelData };
};

module.exports = { getOnlineUsers };
