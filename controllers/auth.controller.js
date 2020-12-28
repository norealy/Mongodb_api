'use strict';
require('dotenv').config();
const User = require('../models/Users.model');
const Encryption = require('../middleware/encryption');
const Token = require('../models/TokenModel');
const jws = require('jws');
const { v4: uuid_V4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT || '12');
const secretAccessKey = process.env.ACCESS_TOKEN_KEY || 'RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=';
const duration = parseInt(process.env.JWT_DURATION || 2400);

async function checkLogin(username, password) {
	try {
		const user = await User.findOne({ "username": username });
		const check = await bcrypt.compare(password, user.password);
		if(check===true) return user._id;
		return null;
	} catch (error) {
		return null;
	}
}

exports.login = async (req, res) => {
		try {
			const { username, password } = req.body;
			if(username&&password){
				const uid = await checkLogin(username, password);
				if (uid) {
					const iat = Math.floor(new Date() / 1000);
					const exp = iat + duration;
					const access_Token = jws.sign({
						header: { alg: 'HS256', typ: 'JWT' },
						payload: { uid: uid, iat, exp },
						secret: secretAccessKey,
					});
					console.log('access_Token', access_Token);
					res.send({ access_Token: access_Token });
				}else{
					res.send("Wrong username or password");
				}
			}
		} catch (error) {
			res.send("Login Fail !");
		}
};

exports.register = async (req, res) => {
	if (req.body.username&&req.body.username) {
		const {username,password} = req.body;
		try {
			const salt = await bcrypt.genSalt(saltRounds);
			const hashPassword = await bcrypt.hash(password, salt);
			const newuser = new User({username,password:hashPassword});
			const user = await newuser.save();
			console.log("user",user);
			const iat = Math.floor(new Date()/1000);
			const exp = iat + duration;
			const access_Token =  jws.sign({
				header: {alg:'HS256',typ:'JWT'},
				payload: {uid: user._id, iat, exp},
				secret:secretAccessKey
			});
			const uid_token = uuid_V4();
			const refresh_token = Encryption.encryptoken(uid_token)
			const newToken = new Token({user_uid:user._id,uid_token,is_revoke:false,created_At:iat, updated_at:iat});
			await newToken.save();
			console.log("refresh_token",refresh_token)
			res.status(201).send({user,Access_Token:access_Token,Refresh_Token:refresh_token,uid_token:uid_token});

		} catch (error) {
			console.log(error)
			res.send("Username exist")
		}

	}else{
		res.send("Username or password empty !");
	}
};