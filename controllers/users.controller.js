'use strict';
require('dotenv').config();
const User = require('../models/Users.model');
const Token = require('../models/TokenModel');
const Encryption = require('../middleware/encryption');
const jws = require('jws')
const {v4:uuid_V4} = require('uuid')
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT || '12');
const secretAccessKey = process.env.ACCESS_TOKEN_KEY || "RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=";
const duration = parseInt(process.env.JWT_DURATION || 2400);
/**
 * 
 * @param {string} password 
 */
async function convertPassword(password) {
	const salt = await bcrypt.genSalt(saltRounds);
	const hashPassword = await bcrypt.hash(password, salt);
	return hashPassword;
}
/**
 * 
 * @param {string} password 
 * @param {string} hashpass 
 */
async function checkPass(password,hashpass) {
	const check = await bcrypt.compare(password, hashpass);
	console.log("Check Password :",check)
	return check;
}

exports.addUser = async (req, res) => {
	if (req.body.username&&req.body.username&&req.body.email&&req.body.phone) {
		const {username,password,email,phone} = req.body;
		try {
			const hashPassword = await convertPassword(password)
			const newuser = new User({username,password:hashPassword,email:email,phone:phone});
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

exports.changePass = async (req, res) => {
	if (req.body.id && req.body.password && req.body.newPassword) {
		let {id,password,newPassword} = req.body;
		const userT = await User.findOne({ "_id": id });
		const hashPassword = await convertPassword(newPassword);
		const check = await checkPass(password,userT.password);
		if(check){
			await User.updateOne({ _id: id}, {
			$set: 
				{ password: hashPassword}
			}, function (err, data) {
				if (err) return res.send("Change password error :",err);
				return res.send("Change password ok !");
			});
		}else{
			return res.send("Wrong password !");
		}
	}else{
		return res.send("Change password fail !");
	}
};

exports.forgetPassword = async (req, res) => {
	if (req.body.newPassword) {
		let user = req.body;
		const hashPassword = await convertPassword(req.body.newPassword)
		await User.findOneAndUpdate({ _id: user.id}, { password: hashPassword }, { new: true }, function (err, data) {
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
	let arrayUser = await User.find().select('-password');
	return res.send(arrayUser);
};

exports.userID = async (req, res) => {
	if(req.params.id){
		let user = await User.findById(req.params.id).select('-password');
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
