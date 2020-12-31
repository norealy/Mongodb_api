'use strict';
require('dotenv').config();
const Admin = require('../models/Admin.model');
const Token = require('../models/TokenModel');
const Encryption = require('../middleware/encryption');
const {v4:uuid_V4} = require('uuid')
const bcrypt = require('bcrypt');
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
 * @param {string} hashpass - password Hash by bcrypt
 * @returns true
 */
async function checkPass(password,hashpass) {
	const check = await bcrypt.compare(password, hashpass);
	console.log("Check Password :",check)
	return check;
}

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
			const uid_token = uuid_V4();
			const refresh_token = Encryption.encryptoken(uid_token)
			const newToken = new Token({user_uid:user._id,uid_token,is_revoke:false,created_At:iat, updated_at:iat});
			await newToken.save();
			console.log("refresh_token",refresh_token)
			res.status(201).send({Amin:user,Refresh_Token:refresh_token,uid_token:uid_token});
			return;
		} catch (error) {
			res.send("Username exist !");
			return;
		}
	}else{
		res.send("Username or password empty !");
		return;
	}
};

exports.changePass = async (req, res) => {
	if (req.body.id && req.body.password && req.body.newPassword) {
		let {id,password,newPassword} = req.body;
		const userT = await Admin.findOne({ "_id": id });
		const hashPassword = await convertPassword(newPassword);
		const check = await checkPass(password,userT.password);
		if(check){
			await Admin.updateOne({ _id: id}, {
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
