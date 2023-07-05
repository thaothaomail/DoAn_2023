'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Tour.belongsToMany(models.User, {
        through: "Binhluans"
      }),
        Tour.belongsToMany(models.Dichvu, {
          through: "DichvuTours"
        }),
        Tour.belongsToMany(models.User, {
          through: "Hoadons"
        }),
        Tour.belongsToMany(models.Ngaydi, {
          through: "TourNgaydis"
        }),
        Tour.hasMany(models.Anh),
        Tour.belongsToMany(models.Loaitour, {
          through: "TourLoaitours"
        }),
        Tour.belongsToMany(models.Diadiem, {
          through: "TourDiadiems"
        }),
        Tour.belongsToMany(models.Khuyenmai, {
          through: "TourKhuyenmais"
        })
      Tour.hasMany(models.TourKhuyenmai),
        Tour.hasMany(models.TourDiadiem),
        Tour.hasMany(models.TourLoaitour),
        Tour.hasMany(models.DichvuTour),
        Tour.hasMany(models.TourNgaydi)
    }
  };
  Tour.init({
    name: DataTypes.STRING(500),
    avatar: DataTypes.STRING(5000),
    tenanh: DataTypes.STRING(1000),
    gianguoilon: DataTypes.INTEGER,
    giatreem: DataTypes.INTEGER,
    giaembe: DataTypes.INTEGER,
    trailer: DataTypes.STRING(1000),
    chitiettour: DataTypes.TEXT,
    luuy: DataTypes.TEXT,
    vitri: DataTypes.INTEGER,
    bando: DataTypes.STRING(5000),
    status: DataTypes.INTEGER,
    songuoi: DataTypes.INTEGER,
    thoigian: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tour',
  });
  return Tour;
};