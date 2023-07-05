module.exports = app => {
    var ngaydi = require('../controller/Ngaydi');
    var router = require('express').Router();

    router.post("/", ngaydi.create);
    router.get('/', ngaydi.findall);
    router.get('/:id', ngaydi.findone);
    router.delete('/:id', ngaydi.delete);
    router.patch('/:id', ngaydi.update);

    app.use("/ngaydis", router);
}