const Auth = require ('./auth.route');
const User = require ('./user.route');
const Order = require ('./order.route');
const Products = require ('./product.route');
const Admin = require ('./admin.route');
const veryToken = require('../middleware/veryToken');

function Routes(app) {
    app.get('/', (req, res) => {
        res.send('Client run !');
    });
    app.use('/auth', Auth);
    app.use('/users',veryToken.verifyAccessToken, User);
    app.use('/orders',veryToken.verifyAccessToken ,Order);
    app.use('/manager-admin',veryToken.verifyADminAccessToken, Admin);
    app.use('/products', Products);
    app.get('/refresh-token', veryToken.verifyRefreshToken);
}

module.exports = Routes;