const Auth = require ('../routes/Auth.route');
const User = require ('../routes/User.route');
const Order = require ('../routes/Order.route');
const Products = require ('../routes/Product.route');
const Admin = require ('../routes/Admin.route');
const {verifyRefreshToken} = require('../middleware/VeryRefreshToken');

function Routes(app) {
    app.use('/auth', Auth);
    app.use('/users', User);
    app.use('/orders' ,Order);
    app.use('/manager-admin', Admin);
    app.use('/products', Products);
    app.post('/refresh-token', verifyRefreshToken);
}

module.exports = Routes;