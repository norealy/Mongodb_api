const {decryptToken} = require('../Utils/Encryption');
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
        console.log(verified)
        if(verified){
            const jwsData = jws.decode(accessToken)
            const uid = jwsData.payload['uid']
            let token_id = decryptToken(refreshToken)
            console.log(token_id)
            const tokenSuccess = await Tokens.findOne({"user_uid":uid,"uid_token":token_id,"is_revoke":false})
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


// user
// "Refresh_Token": "d22709f680daebf4f095f3f87cbebe48a318d7a8933ee10addd25464440a57e22d94169f"
// "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVhM2IxMTYzMTdhZjVlYjEyMzRlODQiLCJpYXQiOjE2MDkxODYwNjUsImV4cCI6MTYwOTE4OTY2NX0.-KQ2YqFKp63Bdi__hcF2y7PwRyHxgc0nIoaiPHMBL2I"

// Admin 
// "Refresh_Token": "837559a485dde0f6f0c5f2ac2fbebe42f61bd7f3ce6bec0ad8d6503618095eef7d9e1795"
// "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWI4OGZiYTYwMjNjYzU5Njg0YzMiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5MzYyMzYwLCJleHAiOjE2MDkzNjU5NjB9.Y0yKOVIpjgOtAUELT1bcHESPm72RgvHWdkdiaEHaInM"