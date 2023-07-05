module.exports = app => {
    var Chiphi = require('../controller/Chiphi');
    var router = require('express').Router();

    router.post("/", Chiphi.create);
    router.get('/', Chiphi.findall);
    router.get('/:id', Chiphi.findone);
    router.delete('/:id', Chiphi.delete);
    router.patch('/:id', Chiphi.update);

    app.use("/chiphis", router);
}