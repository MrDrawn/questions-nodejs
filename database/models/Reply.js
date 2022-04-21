const Sequelize = require('sequelize');

const connection = require('../database');

const Reply = connection.define('reply', {
  ask_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Reply.sync({force: false});

module.exports = Reply;
