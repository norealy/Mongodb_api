const Auth = require ('./auth.route');
const User = require ('./user.route');
const Order = require ('./order.route');
const Products = require ('./product.route');
const Admin = require ('./admin.route');
const veryToken = require('../middleware/veryToken');


function Routes(app,pathRoot) {
    app.get('/auth/login', (req, res) => {
        const file = pathRoot + '/views/login.html';
        res.sendFile(file)
    });
    app.use('/auth', Auth);
    app.use('/users', User);
    app.use('/orders' ,Order);
    app.use('/manager-admin', Admin);
    app.use('/products', Products);
    app.get('/refresh-token', veryToken.verifyRefreshToken);
}

module.exports = Routes;