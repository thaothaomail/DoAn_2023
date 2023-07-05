
module.exports = app => {
    var anh = require('../controller/Anh');
    var router = require('express').Router();

    router.post("/", anh.create);
    router.get('/', anh.findall);
    router.get('/:id', anh.findone);
    router.delete('/:id', anh.delete);
    router.patch('/:id', anh.update);

    app.use("/anhs", router);
}