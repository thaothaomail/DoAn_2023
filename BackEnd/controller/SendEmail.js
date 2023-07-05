const nodemailer = require("nodemailer")
require('dotenv').config();
exports.sendEmail = async (req, res) => {
    const log = console.log;
    const data = req.body;
    // Step 1
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL || 'abc@gmail.com', // TODO: your gmail account
            pass: process.env.PASSWORDEMAIL || '1234' // TODO: your gmail password
        }
    });

    // Step 2
    let mailOptions = {
        from: 'vankienars98@gmail.com', // TODO: email receiver
        to: data.email, // TODO: email sender
        subject: 'Đăng ký tour thành công!',
        text: 'Chúc đã đặt tour thành công tour ' + data.tentour + ' với giá ' + data.thanhtien + 'vnđ Xin chúc mừng bạn !',
    };

    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log('Error occurs', err);
        }
        return log('Email sent!!!');
    });
}