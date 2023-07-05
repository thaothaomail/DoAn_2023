'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('chitieus', 'chitieutuan', {
        type: Sequelize.INTEGER,
        allowNull: true,
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('chitieus', 'chitieutuan')]);
  }
};
