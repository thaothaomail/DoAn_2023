module.exports = app => {
    var User = require('../controller/user');
    var router = require('express').Router();

    router.post("/", User.create);
    router.get('/', User.findall);
    router.get('/:id', User.findone);
    router.get('/:email', User.checkemail);
    router.delete('/:id', User.delete);
    router.patch('/:id', User.update);

    app.use("/users", router);
}