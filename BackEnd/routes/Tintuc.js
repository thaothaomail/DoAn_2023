module.exports = app => {
    var Tintuc = require('../controller/Tintuc');
    var router = require('express').Router();

    router.post("/", Tintuc.create);
    router.get('/', Tintuc.findall);
    router.get('/:id', Tintuc.findone);
    router.delete('/:id', Tintuc.delete);
    router.patch('/:id', Tintuc.update);
    router.post('/tags', Tintuc.addtag);
    app.use("/tintucs", router);
}