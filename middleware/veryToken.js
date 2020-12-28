require('dotenv').config();
const decryption = require('./encryption');
const Tokens = require('../models/TokenModel');
const jwt = require('jsonwebtoken');
const secretAccessKey = process.env.ACCESS_TOKEN_KEY || 'RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=';


module.exports.verifyAccessToken = function (req,res,next){
    const accessToken = req.header('access-token');
    console.log(accessToken)
    if(!accessToken) return res.status(401).send('Access Denis !')
    try {
        jwt.verify(accessToken,secretAccessKey);
        next();
    } catch (error) {
        return res.status(400).send('Invalid Token')
    }
}

module.exports.verifyRefreshToken = async function (req,res,next){
    const refreshToken = req.header('refresh-token');
    console.log(refreshToken)
    if(!refreshToken) return res.status(401).send('Refresh Denis !')
    try {
        // const accessToken = req.header('access-token');
        // jwt.verify(accessToken,secretAccessKey);
        // lay ra user_uid

        let token_id = await decryption.decryptToken(refreshToken)
        // lay ra uid_token

        // "5fe9070fe5861b10ae1c17bd"
        // "9f9704ca-818d-4bdd-959f-17a5611d28b8"

        // await Tokens.findOne({user_uid:user_uid,uid_token:token_id})
        next();
    } catch (error) {
        return res.status(400).send('Invalid Token')
    }
}