require('dotenv').config();
require('./start/Database')();

const express = require('express');
const bodyParser = require('body-parser');
const Routes = require('./start/Routes');
const port = process.env.PORT || 2000;
const jws = require("jws");
const app = express();
const JWS_SECRET = process.env.JWS_SECRET || 'RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const mongoose = require('mongoose');
let uri = process.env.DB_URI || '';
(() => {
    mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }) //
        .then(() => {
            console.log('Connect to mongodb success ! ')
            app.use('/', express.static('public'));
            app.use('/', (req, res, next) => {
                const path = req.path.split("/");
                if (path[1] == 'auth' || req.path == '/' || (path[1] == 'products' && path[2] == 'list')) {
                    return next();
                }
                const accessToken = req.header('Access_Token');
                if (!accessToken) return res.status(401).send('Access token does not exist !');
                const alg = process.env.ALG || 'HS256';
                const verified = jws.verify(accessToken, alg, JWS_SECRET);
                if (!verified) {
                    return res.status(401).send({
                        code: "E_INVALID_JWT_ACCESS_TOKEN",
                        message: `Invalid access token `
                    });
                }
                const jwsData = jws.decode(accessToken);
                const roles = jwsData.payload.roles;
                if ((roles === undefined && (path[2] == 'account' || path[1] == 'orders' || (path[1] == 'products' && path[2] != 'list'))) || path[1] == 'refresh-token') {
                    return next();
                } else if (roles === "admin") {
                    return next();
                }
                return res.status(401).send("What do you want !");
            });

            Routes(app);

            app.listen(port, () => {
                console.log(`Server started on ${port}`);
            });
        })
        .catch((error) => process.exit(0));
})();

module.exports = app