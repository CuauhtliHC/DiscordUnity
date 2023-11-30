const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Channels = sequelize.define('Channels', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

module.exports = Channels;
