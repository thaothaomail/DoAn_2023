module.exports = app => {
    var sendemail = require('../controller/SendEmail');
    var router = require('express').Router();

    router.post("/", sendemail.sendEmail);

    app.use("/sendemail", router);
}