const Env = require('./utils/Env')
require('./start/Database')();

const express = require('express');
const bodyParser = require('body-parser');
const Routes = require('./start/Routes');
const port = Env.get("PORT", 5000);
const jws = require("jws");
const app = express();
const JWS_SECRET = process.env.JWS_SECRET || 'RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());



app.use('/', express.static('public'));
app.use('/', (req, res, next) => {
    const path = req.path.split("/");
    if (path[1] == 'auth' || req.path == '/' || (path[1] == 'products' && path[2] == 'list')) {
        return next();
    }

    const accessToken = req.header('Access_Token');
    if (!accessToken) return res.status(401).send('Access token Denis !');
    try {
        const alg = process.env.ALG || 'HS256';
        const verified = jws.verify(accessToken, alg, JWS_SECRET);
        if (!verified) {
            return res.status(401).send({
                code: "E_INVALID_JWT_ACCESS_TOKEN",
                message: `Invalid access token ${accessToken}`
            });
        }
        const jwsData = jws.decode(accessToken);
        const roles = jwsData.payload.roles;

        if (roles === "admin" || path[1]=='refresh-token') {
            return next();
        }

        if (path[2] == 'account' || path[1] == 'orders' || (path[1] == 'products' && path[2] != 'list')) {
            return next();
        }

        return res.status(401).send("What do you want !");

    } catch (error) {
        return res.status(401).send('Invalid Token');
    }

});

Routes(app);

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

module.exports = app;