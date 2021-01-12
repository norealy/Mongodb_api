const ENV = require('../utils/Env');
const JWS_SECRET = ENV.get("JWS_SECRET",'RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=');
const jws = require('jws');
function  common(req, res, next) {
    const path = req.path.split("/");
    if (path[1] == 'auth' || req.path == '/' || (path[1] == 'products' && path[2] == 'list')) {
        return next();
    }
    const accessToken = req.header('Access_Token');
    if (!accessToken) return res.status(401).send('Access token does not exist !');
    const alg = ENV.get("JWS_ALG",'HS256');
    const verified = jws.verify(accessToken, alg, JWS_SECRET);
    if (!verified) {
        return res.status(401).send({
            code: "E_INVALID_JWT_ACCESS_TOKEN",
            message: `Invalid access token `
        });
    }
    const jwsData = jws.decode(accessToken);
    const roles = jwsData.payload.roles;
    req.uid = jwsData.payload.uid;
    if ((roles === undefined && (path[2] == 'account' || path[1] == 'orders' || (path[1] == 'products' && path[2] != 'list'))) || path[1] == 'refresh-token') {
        return next();
    } else if (roles === "admin") {
        return next();
    }
    return res.status(401).send("What do you want !");
}
module.exports = common