module.exports = app => {
    var Camnangdulich = require('../controller/Camnangdulich');
    var router = require('express').Router();

    router.post("/", Camnangdulich.create);
    router.get('/', Camnangdulich.findall);
    router.get('/:id', Camnangdulich.findone);
    router.delete('/:id', Camnangdulich.delete);
    router.patch('/:id', Camnangdulich.update);

    app.use("/camnangdulichs", router);
}