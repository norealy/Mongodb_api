const bodyParser = require('body-parser');
const express = require('express');
const Auth = require('../routes/Auth.route');
const User = require('../routes/User.route');
const Order = require('../routes/Order.route');
const Products = require('../routes/Product.route');
const Admin = require('../routes/Admin.route');
const { verifyRefreshToken } = require('../middleware/VeryRefreshToken');
const common = require('../middleware/Common');

function Routes(app) {
    app.use('/', express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(common);

    app.use('/auth', Auth);
    app.use('/users', User);
    app.use('/orders', Order);
    app.use('/manager-admin', Admin);
    app.use('/products', Products);
    app.post('/refresh-token', verifyRefreshToken);
}

module.exports = Routes;