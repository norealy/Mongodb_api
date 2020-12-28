'use strict';
require('dotenv').config();
const Admin = require('../models/Admin.model');
const Token = require('../models/TokenModel');
const Encryption = require('../middleware/encryption');
const jws = require('jws')
const {v4:uuid_V4} = require('uuid')
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT || '12');
const secretAccessKey = process.env.ACCESS_TOKEN_KEY || "RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=";
const duration = parseInt(process.env.JWT_DURATION || 2400);

exports.addAdmin = async (req, res) => {
	if (req.body.username&&req.body.username&&req.body.email&&req.body.phone) {
		const {username,password,email,phone} = req.body;
		try {
			const salt = await bcrypt.genSalt(saltRounds);
			const hashPassword = await bcrypt.hash(password, salt);
			const newuser = new Admin({username,password:hashPassword,email:email,phone:phone});
			const user = await newuser.save();
			console.log("Admin",user);
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
			return res.status(201).send({Amin:user,Access_Token:access_Token,Refresh_Token:refresh_token,uid_token:uid_token});

		} catch (error) {
			return res.send("Username exist")
		}

	}else{
		return res.send("Username or password empty !");
	}
};

exports.changePass = async (req, res) => {
	if (req.body.password) {
		let user = req.body;
		await Admin.findOneAndUpdate({ _id: user.id }, { password: user.password }, { new: true }, function (err, data) {
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
		await Admin.findOneAndUpdate({ "_id": user.id }, {"avatar":user.avatar , "fullname":user.fullname, "phone":user.phone, "address" : user.address}, { new: true }, function (err, data) {
		if (err) return console.error(err);
		return res.send(data);
	});
	}else{
		return res.send("Change info fail !");
	}
};

exports.listUsers = async (req, res) => {
	let arrayUser = await Admin.find();
	return res.send(arrayUser);
};

exports.userID = async (req, res) => {
	if(req.params.id){
		let user = await Admin.findOne({"_id":req.params.id});
		return res.send(user);
	}else{
		return res.send("Not found !");
	}
};


exports.deleteByID = async (req, res) => {
	if (req.body.id) {
		await Admin.remove({ _id: req.body.id }, function (err, data) {
			if (err) return console.error(err);
			return res.send(data);
		});
	} else {
		return req.send('Not remove id empty !');
	}
};
exports.deleteByUsername = async (req, res) => {
	if (req.body.username) {
		await Admin.deleteMany({ "username": req.body.username }, function (err, data) {
			if (err) return console.error(err);
			return res.send(data);
		});
	} else {
		return req.send('Not remove id empty !');
	}
};