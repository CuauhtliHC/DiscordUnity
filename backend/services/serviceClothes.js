const { Clothes } = require('../models');

const getOrCreateClothes = () => {};

const checkExistClothes = async (idUser) => {
  const Clothes = await Clothes.findByPk(idUser);
  if (!Clothes) {
    return false;
  }
  return Clothes;
};
