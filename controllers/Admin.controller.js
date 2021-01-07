'use strict';
const Admin = require('../models/Admin.model');
const Token = require('../models/TokenModel');
const {encryptToken} = require('../utils/Encryption');
const {v4:uuid_V4} = require('uuid');
const {hashPass,checkPass} = require('../utils/Password');

const addAdmin = async (req, res) => {
	try {
		const {username,password,email,phone} = req.body;
		const hashPassword = await hashPass(password);
		const newuser = new Admin({username,password:hashPassword,email:email,phone:phone});
		const user = await newuser.save();
		const iat = Math.floor(new Date()/1000);
		const uid_token = uuid_V4();
		const refresh_token = encryptToken(uid_token)
		const newToken = new Token({user_uid:user._id,uid_token,is_revoke:false,created_At:iat, updated_at:iat});
		await newToken.save();
		return res.status(201).send({Amin:user,Refresh_Token:refresh_token,uid_token:uid_token});
	} catch (error) {
		return res.status(401).send("Username exist !");
	}
};

const changePass = async (req, res) => {
	try {
		let {id,password,newPassword} = req.body;
		const userT = await Admin.findOne({ "_id": id });
		const hashPassword = await hashPass(newPassword);
		const check = await checkPass(password,userT.password);
		if(check){
			await Admin.updateOne({ _id: id}, {
			$set: 
				{ password: hashPassword}
			}, function (err, data) {
				if (err) return res.status(401).send("Change password Fail!");
				return res.send("Change password ok !");
			});
		}else{
			return res.status(401).send("Change password Fail!");
		}
	} catch (error) {
		return res.status(401).send("Change password Fail!");
	}
};

const changeInfo = async (req, res) => {
		try {
			let user = req.body;
				await Admin.findOneAndUpdate({ "_id": user.id }, {"avatar":user.avatar , "fullname":user.fullname, "phone":user.phone, "address" : user.address}, { new: true }, function (err, data) {
				if (err) return res.status(401).send("Change info Fail!");
				return res.status(200).send(data);
			});
		} catch (error) {
			return res.status(401).send("Change info Fail!");
		}
};

const listUsers = async (req, res) => {
	try {
		let arrayUser = await Admin.find();
		return res.status(200).send(arrayUser);
	} catch (error) {
		return res.send("list Users Fail!");
	}
};

const userID = async (req, res) => {
	try {
		let user = await Admin.findOne({"_id":req.params.id});
		return res.status(200).send(user);
	} catch (error) {
		return res.status(401).send("UserId Fail!");
	}
};


const deleteByID = async (req, res) => {
		try {
			await Admin.deleteOne({ _id: req.body.id }, function (err, data) {
				if (err) return res.status(401).send("Delete UserId Fail!");
				return res.status(200).send(data);
			});
		} catch (error) {
			return res.status(401).send("Delete UserId Fail!");
		}
};
const deleteByUsername = async (req, res) => {
	try {
		await Admin.deleteMany({ "username": req.body.username }, function (err, data) {
			if (err) return res.status(401).send("Delete User Fail!");
			return res.status(200).send('Delete User OK');
		});
	} catch (error) {
		return res.status(401).send("Delete User Fail!");
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

