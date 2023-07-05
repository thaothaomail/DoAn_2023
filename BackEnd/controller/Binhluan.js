var Binhluan = require('../models').Binhluan;
var Tour = require("../models").Tour;
var User = require("../models").User;
exports.create = (req, res) => {
    Binhluan.create(req.body).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findall = (req, res) => {
    Binhluan.findAll({ include: [{ model: Tour, attributes: ['id', 'name'] }, { model: User, attributes: ['id', 'name', 'gioitinh', 'email', 'avatar'] }] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findone = (req, res) => {
    Binhluan.findOne({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    Binhluan.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    Binhluan.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
