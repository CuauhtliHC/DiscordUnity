const getOnlineUsers = (channels) => {
  const channelData = [];
  const usersOnline = [];

  channels
    .filter((channel) => channel.type === 2)
    .forEach((voiceChannel) => {
      const connectedMembers = voiceChannel.members;
      if (connectedMembers.size > 0) {
        console.log(`Usuarios conectados a ${voiceChannel.name}:`);
        connectedMembers.forEach((member) => {
          console.log(`- ${member.user.username}`);
        });
        const usersInChannel = connectedMembers.map((member) => {
          return { userID: member.user.id, userName: member.user.username };
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
