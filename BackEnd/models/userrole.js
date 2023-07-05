'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserRole.belongsTo(models.User, {
        foreignKey: "userId"
      })
    }
  };
  UserRole.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Role",
        key: "id"
      }
    },
    chamngon: DataTypes.STRING(1000),
    website: DataTypes.STRING,
    kynang: DataTypes.STRING(5000),
    facebook: DataTypes.STRING(500),
    github: DataTypes.STRING(500)
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  return UserRole;
};