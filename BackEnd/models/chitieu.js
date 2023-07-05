'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chitieu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Chitieu.init({
    chitieungay: DataTypes.INTEGER,
    chitieutuan: DataTypes.INTEGER,
    chitieuthang: DataTypes.INTEGER,
    chitieunam: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chitieu',
  });
  return Chitieu;
};