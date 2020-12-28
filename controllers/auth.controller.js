'use strict';
require('dotenv').config();
const User = require('../models/Users.model');
const Admin = require('../models/Admin.model');
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
async function AdminLogin(username, password) {
	try {
		const user = await Admin.findOne({ "username": username });
		const check = await bcrypt.compare(password, user.password);
		if(check===true) return user._id;
		return null;
	} catch (error) {
		return null;
	}
}
exports.adminLogin = async (req, res) => {
	try {
		const { username, password } = req.body;
		if(username&&password){
			const uid = await AdminLogin(username, password);
			if (uid) {
				const iat = Math.floor(new Date() / 1000);
				const exp = iat + duration;
				const access_Token = jws.sign({
					header: { alg: 'HS256', typ: 'JWT' },
					payload: { uid: uid, iat, exp },
					secret: secretAccessKey,
				});
				console.log('Access_Token', access_Token);
				return res.send({ access_Token: access_Token });
			}else{
				return res.send("Wrong username or password");
			}
		}
	} catch (error) {
		return res.send("Login Fail !");
	}
};
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
					console.log('Access_Token', access_Token);
					return res.send({ access_Token: access_Token });
				}else{
					return res.send("Wrong username or password");
				}
			}
		} catch (error) {
			return res.send("Login Fail !");
		}
};

exports.register = async (req, res) => {
	if (req.body.username&&req.body.username&&req.body.email&&req.body.phone) {
		const {username,password,email,phone} = req.body;
		try {
			const salt = await bcrypt.genSalt(saltRounds);
			const hashPassword = await bcrypt.hash(password, salt);
			const newuser = new User({username,password:hashPassword,email:email,phone:phone});
			const user = await newuser.save();
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
			return res.status(201).send({user,Access_Token:access_Token,Refresh_Token:refresh_token,uid_token:uid_token});

		} catch (error) {
			console.log(error)
			return res.send("Username exist")
		}

	}else{
		return res.send("Username or password empty !");
	}
};