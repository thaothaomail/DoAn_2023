module.exports = app => {
    var Hoadoncanhan = require('../controller/Hoadoncanhan');
    var router = require('express').Router();

    router.post("/", Hoadoncanhan.create);
    router.get('/', Hoadoncanhan.findall);
    router.get('/:id', Hoadoncanhan.findone);
    router.delete('/:id', Hoadoncanhan.delete);
    router.patch('/:id', Hoadoncanhan.update);

    app.use("/hoadoncanhans", router);
}