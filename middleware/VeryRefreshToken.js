const {decryptToken} = require('../utils/Encryption');
const Tokens = require('../models/TokenModel');
const jws = require('jws');
const jwsSecret = process.env.JWS_SECRET || 'RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=';
const duration = parseInt(process.env.JWS_DURATION || 2400);
const durationRefresh = parseInt(process.env.REFRESH_DUCATION || 31536000);
const alg = process.env.JWS_ALG ||"HS256";

module.exports.verifyRefreshToken = async function (req,res){
    let {refreshToken} = req.body;
    if(!refreshToken)
        refreshToken = req.cookies['Refresh-token'];
    if(!refreshToken)
        res.status(401)
            .send({
                code: "E_INVALID_JWT_REFRESH_TOKEN",
                message: `Invalid refresh token ${refreshToken}`
            });
    try {
        const accessToken = req.header('Access_Token');
        if(!accessToken){return res.status(401).send('Access token Denis !')}
        const verified = await jws.verify(accessToken,alg,jwsSecret);
        if(verified){
            const jwsData = jws.decode(accessToken)
            const uid = jwsData.payload['uid']
            let tokenUid = decryptToken(refreshToken)
            const tokenSuccess = await Tokens.findOne({"user_uid":uid,"uid_token":tokenUid,"is_revoke":false})
            if(!tokenSuccess){
                return res.status(401).send({
                    code: "E_INVALID_JWT_REFRESH_TOKEN",
                    message: `Invalid refresh token ${refreshToken}`
                });
            }

            const now = Math.floor(new Date() / 1000);
            if (now - tokenSuccess.created_at >= durationRefresh) {
                tokenSuccess.is_revoke = true;
                await tokenSuccess.save();
                return res.status(401)
                    .send({
                        code: "E_INVALID_JWT_REFRESH_TOKEN",
                        message: `Invalid refresh token ${refreshToken}`
                    });
            }
            const exp = now + duration;
            const access_Token =  jws.sign({
                header: {alg: alg,typ:'JWT'},
                payload: {uid: uid, iat:now, exp},
                secret:jwsSecret
            });
            return res.status(200).send( {New_AccsessToken:access_Token} );
            
        }
        return res.status(401).send({
            code: "E_INVALID_JWT_TOKEN",
            message: "The Jwt token is invalid",
        });
    } catch (error) {
        return res.status(401).send('Invalid Token');
    }
}
