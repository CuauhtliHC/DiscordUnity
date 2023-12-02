const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Guilds = sequelize.define('Guilds', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
  },
});

module.exports = Guilds;
