module.exports = app => {
    var diadiem = require('../controller/Diadiem');
    var router = require('express').Router();

    router.post("/", diadiem.create);
    router.get('/', diadiem.findall);
    router.get('/:id', diadiem.findone);
    router.delete('/:id', diadiem.delete);
    router.patch('/:id', diadiem.update);

    app.use("/diadiems", router);
}