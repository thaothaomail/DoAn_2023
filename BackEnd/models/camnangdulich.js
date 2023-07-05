'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Camnangdulich extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Camnangdulich.init({
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    content: DataTypes.STRING(500),
    status: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Camnangdulich',
  });
  return Camnangdulich;
};