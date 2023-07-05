module.exports = app => {
    var Dichvu = require('../controller/Dichvu');
    var router = require('express').Router();

    router.post("/", Dichvu.create);
    router.get('/', Dichvu.findall);
    router.get('/:id', Dichvu.findone);
    router.delete('/:id', Dichvu.delete);
    router.patch('/:id', Dichvu.update);

    app.use("/dichvus", router);
}