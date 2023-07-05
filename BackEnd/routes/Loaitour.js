module.exports = app => {
    var loaitour = require('../controller/Loaitour');
    var router = require('express').Router();

    router.post("/", loaitour.create);
    router.get('/', loaitour.findall);
    router.get('/:id', loaitour.findone);
    router.delete('/:id', loaitour.delete);
    router.patch('/:id', loaitour.update);

    app.use("/loaitours", router);
}