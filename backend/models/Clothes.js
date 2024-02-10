const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Clothes = sequelize.define('', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
  },
  glasses: {
    type: DataTypes.STRING,
  },
  shirt: {
    type: DataTypes.STRING,
  },
  jacket: {
    type: DataTypes.STRING,
  },
  pants: {
    type: DataTypes.STRING,
  },
  shoes: {
    type: DataTypes.STRING,
  },
});

module.exports = Clothes;
