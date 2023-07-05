module.exports = app => {
    var Thongbao = require('../controller/Thongbao');
    var router = require('express').Router();

    router.post("/", Thongbao.create);
    router.get('/', Thongbao.findall);
    router.get('/:id', Thongbao.findone);
    router.delete('/:id', Thongbao.delete);
    router.patch('/:id', Thongbao.update);

    app.use("/thongbaos", router);
}