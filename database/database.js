const Sequelize = require('sequelize');

require('dotenv').config();

const connection = new Sequelize(
  process.env.mysql_database,
  process.env.mysql_user,
  process.env.mysql_password,
  {
    host: process.env.mysql_hostname,
    dialect: 'mysql',
  },
);

module.exports = connection;
