'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anh extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Anh.belongsTo(models.Tour)
    }
  };
  Anh.init({
    link: DataTypes.STRING(1000),
    tenanh: DataTypes.STRING(1000),
    status: DataTypes.INTEGER,
    banner: DataTypes.INTEGER,
    tourId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tour",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Anh',
  });
  return Anh;
};