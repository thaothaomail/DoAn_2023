'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TourKhuyenmai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TourKhuyenmai.belongsTo(models.Tour, {
        foreignKey: "tourId"
      })
    }
  };
  TourKhuyenmai.init({
    tourId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tour",
        key: "id"
      }
    },
    khuyenmaiId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Khuyenmai",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'TourKhuyenmai',
  });
  return TourKhuyenmai;
};