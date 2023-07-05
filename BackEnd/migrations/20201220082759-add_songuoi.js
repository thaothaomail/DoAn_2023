'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('tours', 'songuoi', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.addColumn('tours', 'thoigian', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('tours', 'songuoi'), queryInterface.removeColumn('tours', 'thoigian')]);
  }
};
