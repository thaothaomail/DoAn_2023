'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tintuc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tintuc.belongsToMany(models.Tag, {
        through: "TintucTags"
      });
      Tintuc.hasMany(models.TintucTag)
    }
  };
  Tintuc.init({
    name: DataTypes.STRING,
    tomtat: DataTypes.STRING(1000),
    content: DataTypes.TEXT,
    tacgia: DataTypes.STRING,
    anh: DataTypes.STRING(5000),
    tenanh: DataTypes.STRING(1000),
    facebook: DataTypes.STRING(500),
    instagram: DataTypes.STRING(500),
    twitch: DataTypes.STRING(500),
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tintuc',
  });
  return Tintuc;
};