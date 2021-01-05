const Auth = require ('./Auth.route');
const User = require ('./User.route');
const Order = require ('./Order.route');
const Products = require ('./Product.route');
const Admin = require ('./Admin.route');
const {verifyRefreshToken} = require('../middleware/VeryRefreshToken');

function Routes(app) {
    app.use('/auth', Auth);
    app.use('/users', User);
    app.use('/orders' ,Order);
    app.use('/manager-admin', Admin);
    app.use('/products', Products);
    app.get('/refresh-token', verifyRefreshToken);
}

module.exports = Routes;