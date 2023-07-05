require("dotenv").config();
const jwt = require('jsonwebtoken')

function authen(req, res, next) {
    if (req.headers && req.headers.authorization && String(req.headers.authorization.split(' ')[0]).toLowerCase() === 'bearer') {
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send({
                    message: 'token loi roi'
                })
            } else {
                console.log(user);
                return next();
            }
        })
    } else {
        return res.status(403).send({
            message: 'UN'
        });
    }
};
module.exports = authen