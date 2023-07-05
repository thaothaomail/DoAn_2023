module.exports = app => {
    var Chitieu = require('../controller/Chitieu');
    var router = require('express').Router();

    router.post("/", Chitieu.create);
    router.get('/', Chitieu.findall);
    router.get('/:id', Chitieu.findone);
    router.delete('/:id', Chitieu.delete);
    router.patch('/:id', Chitieu.update);

    app.use("/chitieus", router);
}