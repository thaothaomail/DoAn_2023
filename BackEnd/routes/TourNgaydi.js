module.exports = app => {
    var TourNgaydi = require('../controller/TourNgaydi');
    var router = require('express').Router();

    router.post("/", TourNgaydi.create);
    router.get('/', TourNgaydi.findall);
    router.delete('/:id', TourNgaydi.delete);
    router.patch('/:id', TourNgaydi.update);

    app.use("/tourngaydis", router);
}