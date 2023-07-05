'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Hoadoncanhans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      noikhoihanh: {
        type: Sequelize.STRING
      },
      ngaykhoihanh: {
        type: Sequelize.STRING
      },
      diadiemdi: {
        type: Sequelize.STRING
      },
      giatien: {
        type: Sequelize.INTEGER
      },
      luuy: {
        type: Sequelize.STRING(1000)
      },
      kiemduyet: {
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
    await queryInterface.dropTable('Hoadoncanhans');
  }
};