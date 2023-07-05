'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lienhe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Lienhe.init({
    sdt: DataTypes.STRING,
    email: DataTypes.STRING,
    content: DataTypes.STRING(500),
    diachi: DataTypes.STRING(1000),
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lienhe',
  });
  return Lienhe;
};