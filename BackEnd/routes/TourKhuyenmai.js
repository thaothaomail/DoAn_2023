module.exports = app => {
    var TourKhuyenmai = require('../controller/TourKhuyenmai');
    var router = require('express').Router();

    router.post("/", TourKhuyenmai.create);
    router.get('/', TourKhuyenmai.findall);
    router.delete('/:id', TourKhuyenmai.delete);
    router.patch('/:id', TourKhuyenmai.update);

    app.use("/tourkhuyenmais", router);
}