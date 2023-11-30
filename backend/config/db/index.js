const Sequelize = require('sequelize');
const { config } = require('dotenv');

config();

const db = new Sequelize(
  process.env.DBNAME,
  process.env.USERDB,
  process.env.PWDB,
  {
    host: 'localhost',
    dialect: 'postgres',
    port: process.env.PORT,
    logging: false,
  },
);

module.exports = db;
