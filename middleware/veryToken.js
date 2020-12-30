require('dotenv').config();
const decryption = require('./encryption');
const Tokens = require('../models/TokenModel');
const jws = require('jws');
const secretAccessKey = process.env.ACCESS_TOKEN_KEY || 'RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=';
const duration = parseInt(process.env.JWT_DURATION || 2400);
const durationRefresh = parseInt(process.env.JWT_DURATION || 2400);
const alg = process.env.ALG ||"HS256";

module.exports.verifyAccessToken = async function (req,res,next){
    const accessToken = req.header('Access_Token');
    console.log(accessToken)
    if(!accessToken) return res.status(401).send('Access token Denis !')
    try {
        const verified = await jws.verify(accessToken,alg,secretAccessKey);
        if(verified){
            return next();
        } 
        return res.status(401).send({
            code: "E_INVALID_JWT_ACCESS_TOKEN",
            message: `Invalid access token ${accessToken}`
        });
    } catch (error) {
        return res.status(401).send('Invalid Token')
    }
}

module.exports.verifyRefreshToken = async function (req,res){
    const refreshToken = req.header('Refresh_Token');
    if(!refreshToken) return res.status(401).send({
        code: "E_MISSING_AUTH_HEADER",
        message: "Cannot parse or read Basic auth header"
    });
    try {
        const accessToken = req.header('Access_Token');
        const signature = accessToken.split('.')[2]
        console.log("signature : ",signature)
        const verified = await jws.verify(accessToken,alg,secretAccessKey);
        console.log("verified : ",verified);
        if(verified){
            const jwsData = jws.decode(accessToken)
            const uid = jwsData.payload['uid']
            console.log("UID : ",uid)
            let token_id = decryption.decryptToken(refreshToken)
            console.log("TOKEN_ID : ",token_id)
            const tokenSuccess = await Tokens.findOne({"user_uid":uid,"uid_token":token_id,"is_revoke":false})
            console.log("tokenSuccess:",tokenSuccess)
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
                header: {alg:'HS256',typ:'JWT'},
                payload: {uid: uid, iat:now, exp},
                secret:secretAccessKey
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


// {
//     "Amin": {
//         "_id": "5feceb88fba6023cc59684c3",
//         "username": "admin2",
//         "password": "$2b$10$rE7jT6.6SyL5SlUUy0s4DefnZnJfDkuDp4nn4DxmISo43IKte8ay.",
//         "email": "xdatgd@gmail.com",
//         "phone": "0332302222",
//         "__v": 0
//     },
//     "Refresh_Token": "837559a485dde0f6f0c5f2ac2fbebe42f61bd7f3ce6bec0ad8d6503618095eef7d9e1795",
//     "uid_token": "7a61c336-2561-49d1-99c8-751b9f94d8c9"
// }
// {
//     "user": {
//         "_id": "5fea3b116317af5eb1234e84",
//         "username": "admin322",
//         "password": "$2b$10$jsI.TIDv06Hdnzuwoc5JFu7qmi9qHgB7eOBsx3PPEGEZkUYfF6E22",
//         "email": "xdatgd@gmail.com",
//         "phone": "0332302626",
//         "__v": 0
//     },
//     "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVhM2IxMTYzMTdhZjVlYjEyMzRlODQiLCJpYXQiOjE2MDkxODYwNjUsImV4cCI6MTYwOTE4OTY2NX0.-KQ2YqFKp63Bdi__hcF2y7PwRyHxgc0nIoaiPHMBL2I",
//     "Refresh_Token": "d22709f680daebf4f095f3f87cbebe48a318d7a8933ee10addd25464440a57e22d94169f",
//     "uid_token": "f3fcf484-b4bb-4312-bd65-2150ee0942b3"
// }

// user
// "Refresh_Token": "d22709f680daebf4f095f3f87cbebe48a318d7a8933ee10addd25464440a57e22d94169f"
// "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVhM2IxMTYzMTdhZjVlYjEyMzRlODQiLCJpYXQiOjE2MDkxODYwNjUsImV4cCI6MTYwOTE4OTY2NX0.-KQ2YqFKp63Bdi__hcF2y7PwRyHxgc0nIoaiPHMBL2I"

// Admin 
// "Refresh_Token": "837559a485dde0f6f0c5f2ac2fbebe42f61bd7f3ce6bec0ad8d6503618095eef7d9e1795"
// "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmVjZWI4OGZiYTYwMjNjYzU5Njg0YzMiLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjA5MzYyMzYwLCJleHAiOjE2MDkzNjU5NjB9.Y0yKOVIpjgOtAUELT1bcHESPm72RgvHWdkdiaEHaInM"