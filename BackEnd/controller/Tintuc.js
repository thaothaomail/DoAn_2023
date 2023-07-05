var Tintuc = require('../models').Tintuc;
var Tag = require('../models').Tag;
var TintucTag = require("../models").TintucTag;
exports.create = (req, res) => {
    Tintuc.create(req.body, { include: [TintucTag] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findall = (req, res) => {
    Tintuc.findAll({ include: [Tag] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
        // res.json({ er: er.message })
    })
}
exports.findone = (req, res) => {
    Tintuc.findOne({ include: [Tag] }, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    Tintuc.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    Tintuc.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.addtag = (req, res) => {
    TintucTag.create(req.body).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })

}