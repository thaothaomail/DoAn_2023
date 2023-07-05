require("dotenv").config()
const User = require('../models').User;
const jwt = require('jsonwebtoken')
const Role = require("../models").Role;
exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findAll({
        where: { email: email, password: password },
        include: [Role]
    }).then(data => {
        if (data[0] !== undefined) {
            var user = {
                id: data[0].id,
                role: data[0].Roles[0].name,
                mota: data[0].Roles[0].mota
            };
            var token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '3h' });
            res.json(token);
        } else {
            res.json("err");
        }
    }
    ).catch(err => {
        res.json({ err: err.message })
    })
}