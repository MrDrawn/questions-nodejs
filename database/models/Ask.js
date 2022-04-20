const Sequelize = require('sequelize');

const connection = require('../database');

const Ask = connection.define('ask', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ask: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Ask.sync({force: false});

module.exports = Ask;
