'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Diadiem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Diadiem.belongsTo(models.Quocgia, {
        foreignKey: "quocgiaId",
        targetKey: "id"
      }),
        Diadiem.belongsToMany(models.Tour, {
          through: "TourDiadiems"
        })
    }
  };
  Diadiem.init({
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    quocgiaId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Quocgia",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Diadiem',
  });
  return Diadiem;
};