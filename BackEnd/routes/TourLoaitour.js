module.exports = app => {
    var TourLoaitour = require('../controller/TourLoaitour');
    var router = require('express').Router();

    router.post("/", TourLoaitour.create);
    router.get('/', TourLoaitour.findall);
    router.delete('/:id', TourLoaitour.delete);
    router.patch('/:id', TourLoaitour.update);

    app.use("/tourloaitours", router);
}