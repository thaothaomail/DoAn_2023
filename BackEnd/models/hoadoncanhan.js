'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hoadoncanhan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hoadoncanhan.belongsTo(models.User, {
        foreignKey: "userId"
      });
    }
  };
  Hoadoncanhan.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    },
    noikhoihanh: DataTypes.STRING,
    ngaykhoihanh: DataTypes.STRING,
    diadiemdi: DataTypes.STRING,
    giatien: DataTypes.INTEGER,
    luuy: DataTypes.STRING(1000),
    kiemduyet: DataTypes.INTEGER,
    agree: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hoadoncanhan',
  });
  return Hoadoncanhan;
};