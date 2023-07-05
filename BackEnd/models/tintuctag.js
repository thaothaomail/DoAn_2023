'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TintucTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TintucTag.belongsTo(models.Tag, {
        foreignKey: "tagId"
      });
      TintucTag.belongsTo(models.Tintuc, {
        foreignKey: "tintucId"
      });
    }
  };
  TintucTag.init({
    tintucId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tintuc",
        key: "id"
      }
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tag",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'TintucTag',
  });
  return TintucTag;
};