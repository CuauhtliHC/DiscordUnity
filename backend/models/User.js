const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
  },
});

module.exports = Users;
