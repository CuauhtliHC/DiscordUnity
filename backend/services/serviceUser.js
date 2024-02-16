const { User, Clothes } = require('../models');

const getOrCreateUser = async (idUser) => {
  try {
    const user = await checkExistUser(idUser);
    if (!user) {
      const user = await createUser(idUser);
      return user;
    }
    return user;
  } catch (error) {
    return error;
  }
};

const checkExistUser = async (idUser) => {
  try {
    const user = await User.findByPk(idUser);
    if (!user) {
      return false;
    }
    return user;
  } catch (error) {
    return error;
  }
};

const createUser = async (idUser) => {
  try {
    const user = await User.create({
      id: idUser,
    });
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = { getOrCreateUser };
