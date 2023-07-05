var User = require('../models').User;
var Role = require('../models').Role;
var UserRole = require('../models').UserRole;

exports.create = (req, res) => {
    User.create(req.body, { include: [UserRole] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findall = (req, res) => {
    User.findAll({ attributes: ['id', 'name', 'gioitinh', 'email', 'avatar', "diachi", "sdt", "ngaysinh", "status"], order: [["id", "DESC"]], include: [Role, UserRole] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findone = (req, res) => {
    User.findOne({ where: { id: req.params.id }, include: [Role] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    User.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    User.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.checkemail = (req, res) => {
    User.findOne({ where: { email: req.params.email } }).then(data => {
        console.log(req.params.email);
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
