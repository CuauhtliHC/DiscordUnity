const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Body = sequelize.define('Body', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

module.exports = Body;
