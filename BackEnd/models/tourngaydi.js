'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TourNgaydi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TourNgaydi.belongsTo(models.Tour, {
        foreignKey: "tourId"
      })
    }
  };
  TourNgaydi.init({
    tourId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tour",
        key: "id"
      }
    },
    ngaydiId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Ngaydi",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'TourNgaydi',
  });
  return TourNgaydi;
};