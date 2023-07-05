'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dichvu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Dichvu.belongsToMany(models.Tour, {
        through: "DichvuTours"
      })
    }
  };
  Dichvu.init({
    name: DataTypes.STRING,
    mota: DataTypes.STRING,
    icon: DataTypes.STRING,
    loadhome: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dichvu',
  });
  return Dichvu;
};