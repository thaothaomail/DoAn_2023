const { VNPay, OnePayInternational } = require("vn-payments");

module.exports = app => {
    var routes = require('express').Router();

    const onepayIntl = new OnePayInternational({
        paymentGateway: 'http://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
        merchant: 'PGT38WKZ',
        accessCode: 'PGT38WKZ',
        secureSecret: 'XTVWFFHNGONUHPNALMYQLYULKITIGAZO',
    });
    routes.post('/checkout', (req, res) => {
        const params = Object.assign({}, req.body);
        console.log(params.amount + ":" + params.email);
        // construct checkout payload from form data and app's defaults
        const checkoutData = {
            amount: parseInt(params.amount, 10),
            customerId: params.email,
            currency: 'VND',
            /*...*/
        };

        // buildCheckoutUrl is async operation and will return a Promise
        onepayIntl.buildCheckoutUrl(checkoutData).then(checkoutUrl => {
            res.writeHead(301, { Location: checkoutUrl.href });
            res.end();
        }).catch(err => {
            res.send(err);
        });
    });
    routes.get('/callback', (req, res) => {
        const query = req.query;

        onepayIntl.verifyReturnUrl(query).then(results => {
            if (results.isSucceed) {
                res.render('success', {
                    title: 'Nau Store - Thank You',
                    orderId: results.orderId,
                    price: results.price,
                    message: results.message,
                });
            } else {
                res.render('errors', {
                    title: 'Nau Store - Payment Errors',
                    message: results.message,
                });
            }
        });
    });

    app.use("/payment", routes);
}