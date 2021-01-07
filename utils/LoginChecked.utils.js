
const User = require('../models/Users.model');
const Admin = require('../models/Admin.model');
const bcrypt = require('bcrypt');
/**
 * 
 * @param {string} username 
 * @param {string} password 
 */
const userLogin = async function (username, password) {
	try {
		const user = await User.findOne({ "username": username });
		const check = await bcrypt.compare(password, user.password);
		if (check === true) return user._id;
		return null;
	} catch (error) {
		return null;
	}
}
/**
 * 
 * @param {string} username 
 * @param {string} password 
 */
const adminLogin = async function (username, password) {
	try {
		const user = await Admin.findOne({ "username": username });
		const check = await bcrypt.compare(password, user.password);
		if (check === true) return user._id;
		return null;
	} catch (error) {
		return null;
	}
}

module.exports = {
	userLogin,
	adminLogin
}