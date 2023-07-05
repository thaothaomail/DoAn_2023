'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Binhluan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Binhluan.belongsTo(models.Tour,
        {
          foreignKey: "tourId"
        });
      Binhluan.belongsTo(models.User, {
        foreignKey: "userId"
      })
    }
  };
  Binhluan.init({
    tourId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tour",
        key: "id"
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    },
    binhluan: DataTypes.STRING(1000),
    star: DataTypes.INTEGER,
    loadhome: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Binhluan',
  });
  return Binhluan;
};