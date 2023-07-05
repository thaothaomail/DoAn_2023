'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(500)
      },
      avatar: {
        type: Sequelize.STRING(5000)
      },
      tenanh: {
        type: Sequelize.STRING(1000)
      },
      gianguoilon: {
        type: Sequelize.INTEGER
      },
      giatreem: {
        type: Sequelize.INTEGER
      },
      giaembe: {
        type: Sequelize.INTEGER
      },
      trailer: {
        type: Sequelize.STRING
      },
      chitiettour: {
        type: Sequelize.TEXT
      },
      luuy: {
        type: Sequelize.TEXT
      },
      vitri: {
        type: Sequelize.INTEGER
      },
      bando: {
        type: Sequelize.STRING(5000)
      },
      status: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tours');
  }
};