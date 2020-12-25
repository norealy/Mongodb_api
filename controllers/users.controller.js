const User = require('../models/Users.model');

exports.addUser = async (req, res) => {
	if (req.body) {
		let usrInfo = req.body;
		let newuser = new User(usrInfo);
		await newuser.save(function (err, data) {
			if (err) return console.error(err);
			console.log(data);
			res.send(data);
		});
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
