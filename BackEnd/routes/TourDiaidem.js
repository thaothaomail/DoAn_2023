module.exports = app => {
    var TourDiadiem = require('../controller/TourDiadiem');
    var router = require('express').Router();

    router.post("/", TourDiadiem.create);
    router.get('/', TourDiadiem.findall);
    router.delete('/:id', TourDiadiem.delete);
    router.patch('/:id', TourDiadiem.update);

    app.use("/tourdiadiems", router);
}