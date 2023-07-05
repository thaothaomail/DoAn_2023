module.exports = app => {
    var User = require('../controller/user');
    var router = require('express').Router();


    router.get('/:email', User.checkemail);


    app.use("/checkemail", router);
}