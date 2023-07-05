module.exports = app => {
    var Tour = require('../controller/Tour');
    var router = require('express').Router();

    router.post("/", Tour.create);
    router.get('/', Tour.findall);
    router.get('/:id', Tour.findone);
    router.delete('/:id', Tour.delete);
    router.patch('/:id', Tour.update);
    router.post('/dichvu', Tour.adddichvu);
    router.post('/loaitour', Tour.addloaitour);
    router.post('/ngaydi', Tour.addNgaydi);
    app.use("/tours", router);
}