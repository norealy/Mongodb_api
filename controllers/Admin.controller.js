'use strict';
const Admin = require('../models/Admin.model');
const { hashPass, checkPass } = require('../utils/Password');


const changePass = async (req, res) => {
	try {
		const id = req.uid;
		let { password, newPassword } = req.body;
		const userT = await Admin.findOne({ "_id": id });
		const hashPassword = await hashPass(newPassword);
		const check = await checkPass(password, userT.password);
		if (!check) return res.status(401).send("Change password Fail!");
		await Admin.updateOne({ _id: id }, {
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

const changeInfo = async (req, res) => {
	try {
		const id = req.uid;
		let user = req.body;
		await Admin.findOneAndUpdate({ "_id": id }, { "avatar": user.avatar, "fullname": user.fullname, "phone": user.phone, "address": user.address }, { new: true ,select:'-password'}, function (err, data) {
			if (err) return res.status(401).send("Change info Fail!");
			delete data.password;
			return res.status(200).send(data);
		});
	} catch (error) {
		return res.status(401).send("Change info Fail!");
	}
};

const listAdmin = async (req, res) => {
	try {
		let arrayUser = await Admin.find().select('-password');
		return res.status(200).send(arrayUser);
	} catch (error) {
		return res.status(401).send("list Admin Fail!");
	}
};

const adminByID = async (req, res) => {
	try {
		let user = await Admin.findOne({ "_id": req.params.id }).select('-password');
		return res.status(200).send(user);

	} catch (error) {
		return res.status(401).send("adminByID Fail!");
	}
};

const deleteByID = async (req, res) => {
	try {
		const data = await Admin.findByIdAndRemove({ _id: req.body.id }).select('-password');
		if (!data) return res.status(401).send("Delete UserId Fail!");
		return res.status(200).send(data);
	} catch (error) {
		return res.status(401).send("Delete UserId Fail!");
	}
};
const deleteByUsername = async (req, res) => {
	try {
		const data = await Admin.findOneAndRemove({ "username": req.body.username }).select('-password');
		if (!data) return res.status(401).send("Delete UserId Fail!");
		return res.status(200).send(data);
	} catch (error) {
		return res.status(401).send("Delete User Fail!");
	}
};

module.exports = {
	changePass,
	changeInfo,
	listAdmin,
	adminByID,
	deleteByID,
	deleteByUsername
}

