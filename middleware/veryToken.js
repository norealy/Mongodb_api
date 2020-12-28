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
        console.log("verified : ",verified);
        // console.log(tokenSuccess);
        if(verified){
            const jwsData = jws.decode(accessToken)
            console.log("UID : ",jwsData.payload['uid'])
            let token_id = decryption.decryptToken(refreshToken)
            console.log("TOKEN_ID : ",token_id)
            const tokenSuccess = await Tokens.findOne({"uid_token":token_id}) // {"uid_token":token_id,"user_uid":jwsData.payload['uid']}
            console.log(tokenSuccess)
            if(tokenSuccess){
                const iat = Math.floor(new Date()/1000);
                const exp = iat + duration;
                const access_Token =  jws.sign({
                    header: {alg:'HS256',typ:'JWT'},
                    payload: {uid: jwsData.payload['uid'], iat, exp},
                    secret:secretAccessKey
                });
                return res.status(200).send( {New_AccsessToken:access_Token} );
            }
            return res.status(400).send( "Access Token Denis ! !" );
        }
        return res.status(400).send("Access Token Denis ! !" );
    } catch (error) {
        console.log(error)
        return res.status(400).send('Invalid Token');
    }
}
// {
//     "user": {
//         "_id": "5fe9e976f5c3232e17fcbd77",
//         "username": "usernamet1",
//         "password": "$2b$10$8xzjkMO7zDUt/YCuhq/4K.JvJ1/Fo8sLW1K7FbgBqDXmviGV6rgAW",
//         "email": "xdatgd223@gmail.com",
//         "phone": "0332302626",
//         "__v": 0
//     },
//     "Access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmU5ZTk3NmY1YzMyMzJlMTdmY2JkNzciLCJpYXQiOjE2MDkxNjUxNzQsImV4cCI6MTYwOTE2ODc3NH0.ZvFnfYGTQpWdeE0_GqA3QaCuV2zVK9gscLAdEh5WumM",
//     "Refresh_Token": "842759f1dfd6eaa3f096a5fc28bebe4ff34bd7f3c438ec0adf805830180b04ba2d954d9a",
//     "uid_token": "036d989c-abf6-44aa-9308-0c9d9dca4396"
// }