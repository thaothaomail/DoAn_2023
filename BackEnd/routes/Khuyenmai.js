module.exports = app => {
    var khuyenmai = require('../controller/Khuyenmai');
    var router = require('express').Router();

    router.post("/", khuyenmai.create);
    router.get('/', khuyenmai.findall);
    router.get('/:id', khuyenmai.findone);
    router.delete('/:id', khuyenmai.delete);
    router.patch('/:id', khuyenmai.update);

    app.use("/khuyenmais", router);
}