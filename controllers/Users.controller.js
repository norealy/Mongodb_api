'use strict';
const { deleteOne } = require('../models/Users.model');
const User = require('../models/Users.model');
const { hashPass, checkPass } = require('../utils/Password');

const changePass = async (req, res) => {
	try {
		const id = req.uid;
		let { password, newPassword } = req.body;
		const userT = await User.findOne({ "_id": id });
		const hashPassword = await hashPass(newPassword);
		const check = await checkPass(password, userT.password);
		if (!check) return res.status(401).send("Change password Fail!");
		await User.updateOne({ _id: id }, {
			$set:
				{ password: hashPassword }
		}, function (err) {
			if (err) return res.status(401).send("Change password Fail!");
			return res.send("Change password ok !");
		});
	} catch (error) {
		return res.status(401).send("Change password Fail!");
	}
};

const forgetPassword = async (req, res) => {
	try {
		let user = req.body;
		const hashPassword = await hashPass(req.body.newPassword)
		const userUpdate = await User.findOneAndUpdate({ username: user.username ,phone: user.phone ,email: user.email  }, { password: hashPassword }, { new: true });
		if(userUpdate){
			return res.status(200).send("Create password successful !");
		}
		return res.status(401).send("Forget Password Fail !");
	} catch (error) {
		return res.status(401).send("Forget Password Fail !");
	}
};

const changeInfo = async (req, res) => {
	try {
		let user = req.body;
		const data = await User.findOneAndUpdate({ "_id": req.uid }, { "avatar": user.avatar, "fullname": user.fullname, "phone": user.phone, "address": user.address }, { new: true ,select:'-password'});
		if (!data) return res.status(401).send("Change Info Fail !");
		return res.status(200).send("Change Info ok !");
	} catch (error) {
		return res.status(401).send("Change Info Fail !");
	}
};

const listUsers = async (req, res) => {
	try {
		let arrayUser = await User.find().select('-password');
		delete arrayUser._v
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
const userAccount = async (req, res) => {
	try {
		let user = await User.findById(req.uid).select('-password');
		return res.status(200).send(user);
	} catch (error) {
		return res.status(401).send("Show user Fail !");
	}
};
const deleteByID = async (req, res) => {
	try {
		const data = await User.findByIdAndRemove({ _id: req.body.id });
		if (!data) return res.status(401).send("Delete user Fail !");
		return res.status(200).send("Delete user OK !");
	} catch (error) {
		return res.status(401).send("Delete user Fail !");
	}
};
const deleteByUsername = async (req, res) => {
	try {
		const data = await User.findOneAndDelete({ username: req.body.username });
		if (!data) return res.status(401).send("Delete user Fail !");
		return res.status(200).send("Delete user OK !");
	} catch (error) {
		return res.status(401).send("Delete user Fail !");
	}
};

module.exports = {
	changePass,
	forgetPassword,
	changeInfo,
	listUsers,
	userID,
	deleteByID,
	deleteByUsername,
	userAccount
}
