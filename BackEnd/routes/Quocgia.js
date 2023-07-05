module.exports = app => {
    var Quocgia = require('../controller/Quocgia');
    var router = require('express').Router();

    router.post("/", Quocgia.create);
    router.get('/', Quocgia.findall);
    router.get('/:id', Quocgia.findone);
    router.delete('/:id', Quocgia.delete);
    router.patch('/:id', Quocgia.update);

    app.use("/quocgias", router);
}