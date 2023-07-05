var UserRole = require('../models').UserRole;
exports.create = (req, res) => {
    UserRole.create(req.body).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findall = (req, res) => {
    UserRole.findAll().then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findone = (req, res) => {
    UserRole.findOne({ where: { userId: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    UserRole.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    UserRole.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.addrole = (req, res) => {
    UserRoleRole.create(req.body).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}