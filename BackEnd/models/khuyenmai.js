'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Khuyenmai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Khuyenmai.belongsToMany(models.Tour, {
        through: "TourKhuyenmais"
      })
    }
  };
  Khuyenmai.init({
    name: DataTypes.STRING,
    khuyenmai: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Khuyenmai',
  });
  return Khuyenmai;
};