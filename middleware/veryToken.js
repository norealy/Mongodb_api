require('dotenv').config();
const decryption = require('./encryption');
const Tokens = require('../models/TokenModel');
const jws = require('jws');
const secretAccessKey = process.env.ACCESS_TOKEN_KEY || 'RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=';
const duration = parseInt(process.env.JWT_DURATION || 2400);

module.exports.verifyAccessToken = function (req,res,next){
    const accessToken = req.header('Access_Token');
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
    const refreshToken = req.header('Refresh_Token');
    if(!refreshToken) return res.status(401).send('Refresh Denis !')
    try {
        const accessToken = req.header('Access_Token');
        const signature = accessToken.split('.')[2]
        console.log("signature : ",signature)
        const alg = "HS256";
        const verified = await jws.verify(accessToken,alg,secretAccessKey);
        console.log("verified : ",verified);
        if(verified){
            const jwsData = jws.decode(accessToken)
            const uid = jwsData.payload['uid']
            console.log("UID : ",uid)
            let token_id = decryption.decryptToken(refreshToken)
            console.log("TOKEN_ID : ",token_id)
            // const tokenSuccess = await Tokens.findOne({"user_uid":uid}) // {"uid_token":token_id , "user_uid":uid}
            const tokenSuccess = await Tokens.findOne({"user_uid":uid,"uid_token":token_id}) 
            console.log("tokenSuccess:",tokenSuccess)
            if(tokenSuccess){
                const iat = Math.floor(new Date()/1000);
                const exp = iat + duration;
                const access_Token =  jws.sign({
                    header: {alg:'HS256',typ:'JWT'},
                    payload: {uid: uid, iat, exp},
                    secret:secretAccessKey
                });
                return res.status(200).send( {New_AccsessToken:access_Token} );
            }
            return res.status(400).send( "Token Denis ! !" );
        }
        return res.status(400).send("Access Token Denis ! !" );
    } catch (error) {
        // console.log(error)
        return res.status(400).send('Invalid Token');
    }
}
// {
//     "user": {
//         "_id": "5fe9f08ba3d822183d34d4a9",
//         "username": "usernamet4",
//         "password": "$2b$10$6McSpnUWgrv085dwdv5czeV.pWvtdyCfQeV8aHvIL9cDKSTCJchzy",
//         "email": "xdatgd223@gmail.com",
//         "phone": "0332302626",
//         "__v": 0
//     },
//     "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmU5ZjA4YmEzZDgyMjE4M2QzNGQ0YTkiLCJpYXQiOjE2MDkxNjY5ODcsImV4cCI6MTYwOTE3MDU4N30.H4guxMe6w9ZcBV6Ya13GBkw5PX7Bs2mfOVxrUXH0ZQg",
//     "Refresh_Token": "d2225fa0d4dceaf4f0c7f0f82dbebe19a71bd7f2916cb70a8d805831420904eb2c96429a",
//     "uid_token": "f6052294-07b3-4b51-8fdc-bc9ecfc05066"
// }