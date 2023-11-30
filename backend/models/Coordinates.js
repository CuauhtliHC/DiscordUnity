const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Coordinates = sequelize.define('Coordinates', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  coordinateX: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  coordinateY: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Coordinates;
