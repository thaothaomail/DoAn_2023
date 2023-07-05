'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tintucs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      tomtat: {
        type: Sequelize.STRING(1000)
      },
      content: {
        type: Sequelize.TEXT
      },
      tacgia: {
        type: Sequelize.STRING
      },
      anh: {
        type: Sequelize.STRING(5000)
      },
      tenanh: {
        type: Sequelize.STRING(1000)
      },
      facebook: {
        type: Sequelize.STRING(500)
      },
      instagram: {
        type: Sequelize.STRING(500)
      },
      twitch: {
        type: Sequelize.STRING(500)
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
    await queryInterface.dropTable('Tintucs');
  }
};