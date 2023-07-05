module.exports = app => {
    var DichvuTour = require('../controller/DichvuTour');
    var router = require('express').Router();

    router.post("/", DichvuTour.create);
    router.get('/', DichvuTour.findall);
    router.delete('/:id', DichvuTour.delete);
    router.patch('/:id', DichvuTour.update);

    app.use("/dichvutours", router);
}