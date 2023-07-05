'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DichvuTour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DichvuTour.belongsTo(models.Tour, {
        foreignKey: "tourId"
      })
    }
  };
  DichvuTour.init({
    tourId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tour",
        key: "id"
      }
    },
    dichvuId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Dichvu",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'DichvuTour',
  });
  return DichvuTour;
};