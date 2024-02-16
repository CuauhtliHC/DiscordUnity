const { checkUserConnectChannel } = require('../discordApi');
const { checkUserInRoom } = require('../ioEvents/utils');
const { getOrCreateUser } = require('../services/serviceUser');

const checkDataUser = async (req, res) => {
  const { idUser, listGuilds } = req.body;
  console.log(idUser);
  const user = await getOrCreateUser(idUser);
  console.log(user);
  const socketUser = await checkUserInRoom(idUser);
  // if (socketUser) {
  //   console.log(socketUser);
  //   const room = Array.from(socketUser)[1];
  //   socketUser.to(room).emit('updateCharacter');
  // } else {
  //   checkUserConnectChannel(idUser, listGuilds);
  // }
};

module.exports = { checkDataUser };
