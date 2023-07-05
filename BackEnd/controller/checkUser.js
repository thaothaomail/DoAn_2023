require("dotenv").config();
const jwt = require('jsonwebtoken')

exports.authen = (req, res) => {
    if (req.headers && req.headers.authorization && String(req.headers.authorization.split(' ')[0]).toLowerCase() === 'bearer') {
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send({
                    message: 'token loi roi'
                })
            } else {
                res.json({ data: user.user })
            }
        })
    } else {
        return res.status(403).send({
            message: 'UN'
        });
    }
};
