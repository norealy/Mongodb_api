'use strict';
const User = require('../models/Users.model');
const Token = require('../models/TokenModel');
const Encryption = require('../utils/Encryption');
const jws = require('jws')
const {v4:uuid_V4} = require('uuid')
const {hashPass,checkPass} = require('../utils/Password.utils')
const secretAccessKey = process.env.JWS_SECRET || "RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=";
const duration = parseInt(process.env.JWS_DURATION || 2400);

const addUser = async (req, res) => {
	if (req.body.username&&req.body.username&&req.body.email&&req.body.phone) {
		const {username,password,email,phone} = req.body;
		try {
			const hashPassword = await hashPass(password)
			const newuser = new User({username,password:hashPassword,email:email,phone:phone});
			const user = await newuser.save();
			const iat = Math.floor(new Date()/1000);
			const exp = iat + duration;
			const access_Token =  jws.sign({
				header: {alg:process.env.JWS_ALG||'HS256',typ:'JWT'},
				payload: {uid: user._id, iat, exp},
				secret:secretAccessKey
			});
			const uid_token = uuid_V4();
			const refresh_token = Encryption.encryptoken(uid_token)
			const newToken = new Token({user_uid:user._id,uid_token,is_revoke:false,created_At:iat, updated_at:iat});
			await newToken.save();
			res.status(201).send({user,Access_Token:access_Token,Refresh_Token:refresh_token,uid_token:uid_token});

		} catch (error) {
			res.send("Username exist")
		}

	}else{
		res.send("Username or password empty !");
	}
};

const changePass = async (req, res) => {
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

const forgetPassword = async (req, res) => {
	if (req.body.newPassword) {
		let user = req.body;
		const hashPassword = await hashPass(req.body.newPassword)
		await User.findOneAndUpdate({ _id: user.id}, { password: hashPassword }, { new: true }, function (err, data) {
			if (err) return console.error(err);
			return res.send(data);
		});
	}else{
		return res.send("Change password fail !");
	}
};


const changeInfo = async (req, res) => {
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

const listUsers = async (req, res) => {
	let arrayUser = await User.find().select('-password');
	return res.send(arrayUser);
};

const userID = async (req, res) => {
	if(req.params.id){
		let user = await User.findById(req.params.id).select('-password');
		return res.send(user);
	}else{
		return res.send("Not found !");
	}
};

const deleteByID = async (req, res) => {
	if (req.body.id) {
		await User.remove({ _id: req.body.id }, function (err, data) {
			if (err) return console.error(err);
			return res.send(data);
		});
	} else {
		req.send('Not remove id empty !');
	}
};
const deleteByUsername = async (req, res) => {
	if (req.body.username) {
		await User.deleteMany({ "username": req.body.username }, function (err, data) {
			if (err) return console.error(err);
			return res.send(data);
		});
	} else {
		req.send('Not remove id empty !');
	}
};

module.exports = {
	addUser,
	changePass,
	forgetPassword,
	changeInfo,
	listUsers,
	userID,
	deleteByID,
	deleteByUsername
}
