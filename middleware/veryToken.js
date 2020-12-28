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
        const verified = await jws.verify(accessToken,alg,secretAccessKey);
        console.log(verified);
        // lay ra user_uid
        
        let token_id = await decryption.decryptToken(refreshToken)
        console.log(token_id);
        // lay ra uid_token

        const tokenSuccess = await Tokens.findOne({"uid_token":token_id}) //"user_uid":verified.user_uid,
        // console.log(tokenSuccess);
        
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
//         "_id": "5fe9582a2d6b5e1309aa7c30",
//         "username": "usernamet66",
//         "password": "$2b$10$dm6GhCQ5QrLFF6XcyqHYue91wfL3BwphBLwOSQeuDMuG4Ply1dK1m",
//         "__v": 0
//     },
//     "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmU5NTgyYTJkNmI1ZTEzMDlhYTdjMzAiLCJpYXQiOjE2MDkxMjc5NzgsImV4cCI6MTYwOTEzMTU3OH0.Nl0fzb9Swmqm-gO5QJdpBxz0_SRCSu8qGGJ9kVi4fWA",
//     "Refresh_Token": "d7205facd7dae1a3f0c1ffff29bebe4af04cd7ab916bb70ad7865930100c06ba2d944dcf",
//     "uid_token": "c409142c-68e7-41bf-afcc-8e8d1caa429c"
// }