'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quocgia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Quocgia.hasMany(models.Diadiem, {
        foreignKey: "quocgiaId"
      })
    }
  };
  Quocgia.init({
    name: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Quocgia',
    tableName: 'Quocgias'
  });
  return Quocgia;
};