'use strict';
require('dotenv').config();
const User = require('../models/Users.model');
const Token = require('../models/TokenModel');
const jws = require('jws')
const {v4:uuid_V4} = require('uuid')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = parseInt(process.env.BCRYPT_SALT || '12');
const secretAccessKey = process.env.ACCESS_TOKEN_KEY || "RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=";
const secretRefeshKey = process.env.REFRESH_TOKEN_KEY || "U2ltcGx5IGVudGVyIHlvdXIgZGF0YSB0aGVuIHB1c2ggdGhlIGVuY29kZSBidXR0b24u";
const duration = parseInt(process.env.JWT_DURATION || 2400);
const IV = process.env.IV || '1234567890123456'

function encrypt(uid_token){
	var cipher = crypto.Cipher('aes-256-gcm', Buffer.from(secretRefeshKey,'hex'),IV);
	var token = cipher.update(uid_token, 'utf8', 'hex')
	token += cipher.final('hex');
	console.table({IV:IV.toString('hex'),encrypted: token})
	return token;
};

exports.addUser = async (req, res) => {
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
			// hmacRefresh.update(uid_token);
			// const refresh_token = Buffer.from(hmacRefresh.digest('hex')).toString('base64');
			const refresh_token = encrypt(uid_token)
			const newToken = new Token({user_uid:user._id,uid_token,is_revoke:false,created_At:iat, updated_at:iat});
			await newToken.save();
			console.log("refresh_token",refresh_token)
			res.status(201).send({user,access_Token:access_Token,refresh_token:refresh_token});

		} catch (error) {
			console.log(error)
			res.send("Error")
		}

	}else{
		res.send("Username or password empty !");
	}
};

exports.changePass = async (req, res) => {
	if (req.body.password) {
		let user = req.body;
		await User.findOneAndUpdate({ _id: user.id }, { password: user.password }, { new: true }, function (err, data) {
			if (err) return console.error(err);
			return res.send(data);
		});
	}else{
		return res.send("Change password fail !");
	}
};
exports.changeInfo = async (req, res) => {
	if(req.body.id){
		let user = req.body;
		await User.findOneAndUpdate({ "_id": user.id }, {"avatar":user.avatar , "fullname":user.fullname, "phone":user.phone, "address" : user.address}, { new: true }, function (err, data) {
		if (err) return console.error(err);
		return res.send(data);
	});
	}else{
		return res.send("Change info fail !");
	}
};

exports.listUsers = async (req, res) => {
	let arrayUser = await User.find();
	return res.send(arrayUser);
};

exports.userID = async (req, res) => {
	if(req.params.id){
		let user = await User.findOne({"_id":req.params.id});
		return res.send(user);
	}else{
		return res.send("Not found !");
	}
};


exports.deleteByID = async (req, res) => {
	if (req.body.id) {
		await User.remove({ _id: req.body.id }, function (err, data) {
			if (err) return console.error(err);
			return res.send(data);
		});
	} else {
		req.send('Not remove id empty !');
	}
};
exports.deleteByUsername = async (req, res) => {
	if (req.body.username) {
		await User.deleteMany({ "username": req.body.username }, function (err, data) {
			if (err) return console.error(err);
			return res.send(data);
		});
	} else {
		req.send('Not remove id empty !');
	}
};
