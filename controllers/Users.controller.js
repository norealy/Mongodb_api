'use strict';
const User = require('../models/Users.model');
const Token = require('../models/TokenModel');
const Encryption = require('../utils/Encryption');
const jws = require('jws')
const { v4: uuid_V4 } = require('uuid')
const { hashPass, checkPass } = require('../utils/Password')
const secretAccessKey = process.env.JWS_SECRET || "RW5jb2RlIHRvIEJhc2U2NCBmb3JtYXQ=";
const duration = parseInt(process.env.JWS_DURATION || 2400);

const addUser = async (req, res) => {
	const { username, password, email, phone } = req.body;
	try {
		const hashPassword = await hashPass(password)
		const newuser = new User({ username, password: hashPassword, email: email, phone: phone });
		const user = await newuser.save();
		const iat = Math.floor(new Date() / 1000);
		const exp = iat + duration;
		const access_Token = jws.sign({
			header: { alg: process.env.JWS_ALG || 'HS256', typ: 'JWT' },
			payload: { uid: user._id, iat, exp },
			secret: secretAccessKey
		});
		const uid_token = uuid_V4();
		const refresh_token = Encryption.encryptToken(uid_token)
		const newToken = new Token({ user_uid: user._id, uid_token, is_revoke: false, created_At: iat, updated_at: iat });
		await newToken.save();
		res.status(201).send({ user, Access_Token: access_Token, Refresh_Token: refresh_token, uid_token: uid_token });
	} catch (error) {
		console.log(error)
		res.send("Username exist")
	}
};

const changePass = async (req, res) => {
	try {
		let { id, password, newPassword } = req.body;
		const userT = await User.findOne({ "_id": id });
		const hashPassword = await hashPass(newPassword);
		const check = await checkPass(password, userT.password);
		console.log("Check:", check)
		if (!check) return res.status(401).send("Wrong password !");
		await User.updateOne({ _id: id }, {
			$set:
				{ password: hashPassword }
		}, function (err, data) {
			if (err) return res.status(401).send("Change Password Fail !");
			return res.status(200).send("Change password ok !");
		});
	} catch (error) {
		console.log(error)
		return res.status(401).send("Change Password Fail !");
	}
};

const forgetPassword = async (req, res) => {
	try {
		let user = req.body;
		const hashPassword = await hashPass(req.body.newPassword)
		await User.findOneAndUpdate({ _id: user.id }, { password: hashPassword }, { new: true }, function (err, data) {
			if (err) return res.status(401).send("Forget Password Fail !");
			return res.status(200).send("Forget password ok !");
		});
	} catch (error) {
		return res.status(401).send("Forget Password Fail !");
	}
};


const changeInfo = async (req, res) => {
	try {
		let user = req.body;
		await User.findOneAndUpdate({ "_id": user.id }, { "avatar": user.avatar, "fullname": user.fullname, "phone": user.phone, "address": user.address }, { new: true }, function (err, data) {
			if (err) return res.status(401).send("Change Info Fail !");
			return res.status(200).send("Change Info ok !");
		});
	} catch (error) {
		return res.status(401).send("Change Info Fail !");
	}
};

const listUsers = async (req, res) => {
	try {
		let arrayUser = await User.find().select('-password');
		res.status(200).send(arrayUser);
	} catch (error) {
		return res.status(401).send("Show list Fail !");
	}
};

const userID = async (req, res) => {
	try {
		let user = await User.findById(req.params.id).select('-password');
		return res.status(200).send(user);
	} catch (error) {
		return res.status(401).send("Show user Fail !");
	}
};

const deleteByID = async (req, res) => {
	try {
		await User.deleteOne({ _id: req.body.id }, function (err, data) {
			if (err) return res.status(401).send("Delete user Fail !");
			return res.status(200).send("Delete user OK !");
		});
	} catch (error) {
		return res.status(401).send("Delete user Fail !");
	}
};
const deleteByUsername = async (req, res) => {
	try {
		await User.deleteMany({ "username": req.body.username }, function (err, data) {
			if (err) return res.status(401).send("Delete user Fail !");
			return res.status(200).send("Delete user OK !");
		});
	} catch (error) {
		return res.status(401).send("Delete user Fail !");
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
