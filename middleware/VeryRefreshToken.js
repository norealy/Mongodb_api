const { decryptToken } = require('../utils/Encryption');
const ENV = require('../utils/Env');
const Tokens = require('../models/TokenModel');
const jws = require('jws');
const jwsSecret = ENV.get("JWS_SECRET",'RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=');
const duration = parseInt(ENV.get("JWS_DURATION", '2400'));
const durationRefresh = parseInt(ENV.get('REFRESH_DUCATION')|| '31536000');
const alg = ENV.get("JWS_ALG","HS256");

module.exports.verifyRefreshToken = async function (req, res) {
    let { refreshToken } = req.body;
    if (!refreshToken)
        refreshToken = req.cookies['Refresh-token'];
    if (!refreshToken)
        res.status(401)
            .send({
                code: "E_INVALID_JWT_REFRESH_TOKEN",
                message: `Invalid refresh token `
            });
    try {
        const accessToken = req.header('Access_Token');
        if (!accessToken) {
            return res.status(401)
                .send({
                    code: "E_INVALID_JWT_REFRESH_TOKEN",
                    message: `Invalid refresh token `
                });
        }
        const verified = await jws.verify(accessToken, alg, jwsSecret);
        if (!verified) return res.status(401).send({
            code: "E_INVALID_JWT_REFRESH_TOKEN",
            message: `Invalid refresh token `
        });
        const jwsData = jws.decode(accessToken)
        const uid = jwsData.payload['uid']
        let tokenUid = decryptToken(refreshToken)
        const tokenSuccess = await Tokens.findOne({ "user_uid": uid, "uid_token": tokenUid, "is_revoke": false })
        if (!tokenSuccess) {
            return res.status(401)
                .send({
                    code: "E_INVALID_JWT_REFRESH_TOKEN",
                    message: `Invalid refresh token `
                });
        }

        const now = Math.floor(new Date() / 1000);
        if (now - tokenSuccess.created_at >= durationRefresh) {
            tokenSuccess.is_revoke = true;
            await tokenSuccess.save();
            return res.status(401)
                .send({
                    code: "E_INVALID_JWT_REFRESH_TOKEN",
                    message: `Invalid refresh token `
                });
        }
        const exp = now + duration;
        const newAccessToken = jws.sign({
            header: { alg: alg, typ: 'JWT' },
            payload: { uid: uid, iat: now, exp },
            secret: jwsSecret
        });
        return res.status(200).send({ Access_Token: newAccessToken });
    } catch (error) {
        return res.status(401).send({
            code: "E_INVALID_JWT_REFRESH_TOKEN",
            message: `Invalid refresh token `
        });
    }
}
