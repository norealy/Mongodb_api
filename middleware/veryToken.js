require('dotenv').config();
const decryption = require('./encryption');
const Tokens = require('../models/TokenModel');
const jws = require('jws');
const secretAccessKey = process.env.ACCESS_TOKEN_KEY || 'RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=';
const duration = parseInt(process.env.JWT_DURATION || 2400);

module.exports.verifyAccessToken = function (req,res,next){
    const accessToken = req.header('access-token');
    console.log(accessToken)
    if(!accessToken) return res.status(401).send('Access Denis !')
    try {
        jws.verify(accessToken,secretAccessKey);
        next();
    } catch (error) {
        return res.status(400).send('Invalid Token')
    }
}

module.exports.verifyRefreshToken = async function (req,res,next){
    const refreshToken = req.header('refresh-token');
    if(!refreshToken) return res.status(401).send('Refresh Denis !')
    try {
        const accessToken = req.header('access-token');
        const signature = accessToken.split('.')[2]
        console.log("signature : ",signature)
        const alg = "HS256";
        // const verified = await jws.verify(accessToken,alg,secretAccessKey);
        // console.log(verified);
        // lay ra user_uid
        
        let token_id = await decryption.decryptToken(refreshToken)
        console.log(token_id);
        // lay ra uid_token

        const tokenSuccess = await Tokens.findOne({"user_uid":verified.user_uid,"uid_token":token_id})
        console.log(tokenSuccess);
        
        const iat = Math.floor(new Date()/1000);
        const exp = iat + duration;
        const access_Token =  jws.sign({
            header: {alg:'HS256',typ:'JWT'},
            payload: {uid: tokenSuccess.user_uid, iat, exp},
            secret:secretAccessKey
        });
        return res.status(200).send({New_AccessToken:access_Token});
    } catch (error) {
        console.log(error)
        return res.status(400).send('Invalid Token');
    }
}

// {
//     "user": {
//         "_id": "5fe94f11c5050a616309172a",
//         "username": "usernameq213",
//         "password": "$2b$10$rrFuTYblT/Db6II9Qrjs8.f6kngxwgZz65oIeIOAW69Ugom0bGDS2",
//         "__v": 0
//     },
//     "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmU5NGYxMWM1MDUwYTYxNjMwOTE3MmEiLCJpYXQiOjE2MDkxMjU2NTIsImV4cCI6MTYwOTEyOTI1Mn0.w67HaMi6gar8cDC_S7Ct_0yM_nv24GMDxWkL-XuuRBs",
//     "Refresh_Token": "d52c58f387d6e7a1f0c7f0ad7abebe4df64fd7ab9330b70ad7875864115c5fbe2997159d",
//     "uid_token": "a87fa84a-077d-46de-ad8c-8d90038e01a1"
// }