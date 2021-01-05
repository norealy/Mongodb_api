'use strict';
const Admin = require('../models/Admin.model');
const Token = require('../models/TokenModel');
const {encryptToken} = require('../utils/Encryption');
const {v4:uuid_V4} = require('uuid');
const {hashPass,checkPass} = require('../utils/Password.utils');

const addAdmin = async (req, res) => {
	if (req.body.username&&req.body.username&&req.body.email&&req.body.phone) {
		const {username,password,email,phone} = req.body;
		try {
			const hashPassword = await hashPass(password);
			const newuser = new Admin({username,password:hashPassword,email:email,phone:phone});
			const user = await newuser.save();
			const iat = Math.floor(new Date()/1000);
			const uid_token = uuid_V4();
			const refresh_token = encryptToken(uid_token)
			const newToken = new Token({user_uid:user._id,uid_token,is_revoke:false,created_At:iat, updated_at:iat});
			await newToken.save();
			res.status(201).send({Amin:user,Refresh_Token:refresh_token,uid_token:uid_token});
			return;
		} catch (error) {
			console.log(error)
			res.send("Username exist !");
			return;
		}
	}else{
		res.send("Username or password empty !");
		return;
	}
};

const changePass = async (req, res) => {
	if (req.body.id && req.body.password && req.body.newPassword) {
		let {id,password,newPassword} = req.body;
		const userT = await Admin.findOne({ "_id": id });
		const hashPassword = await hashPass(newPassword);
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

const changeInfo = async (req, res) => {
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

const listUsers = async (req, res) => {
	let arrayUser = await Admin.find();
	return res.send(arrayUser);
};

const userID = async (req, res) => {
	if(req.params.id){
		let user = await Admin.findOne({"_id":req.params.id});
		return res.send(user);
	}else{
		return res.send("Not found !");
	}
};


const deleteByID = async (req, res) => {
	if (req.body.id) {
		await Admin.remove({ _id: req.body.id }, function (err, data) {
			if (err) return console.error(err);
			return res.send(data);
		});
	} else {
		return req.send('Not remove id empty !');
	}
};
const deleteByUsername = async (req, res) => {
	if (req.body.username) {
		await Admin.deleteMany({ "username": req.body.username }, function (err, data) {
			if (err) return console.error(err);
			return res.send(data);
		});
	} else {
		return req.send('Not remove id empty !');
	}
};

module.exports = {
	addAdmin,
	changePass,
	changeInfo,
	listUsers,
	userID,
	deleteByID,
	deleteByUsername
}

