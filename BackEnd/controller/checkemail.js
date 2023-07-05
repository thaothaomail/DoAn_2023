var User = require('../models').User;

exports.checkemail = (req, res) => {
    User.findOne({ where: { email: req.params.email } }).then(data => {
        console.log(req.params.email);
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
