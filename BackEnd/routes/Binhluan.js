module.exports = app => {
    var Binhluan = require('../controller/Binhluan');
    var router = require('express').Router();

    router.post("/", Binhluan.create);
    router.get('/', Binhluan.findall);
    router.get('/:id', Binhluan.findone);
    router.delete('/:id', Binhluan.delete);
    router.patch('/:id', Binhluan.update);

    app.use("/binhluans", router);
}