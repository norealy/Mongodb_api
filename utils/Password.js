const ENV = require('../utils/Env')
const bcrypt = require('bcrypt');
const saltRounds = parseInt(ENV.get("BCRYPT_SALT",'12'));
/**
 * 
 * @param {string} password 
 * @returns {string} hashPassword
 */
const hashPass = async function (password) {
	const salt = await bcrypt.genSalt(saltRounds);
	const hashPassword = await bcrypt.hash(password, salt);
	return hashPassword;
}
/**
 * 
 * @param {string} password 
 * @param {string} hashpass - password Hash by bcrypt
 * @returns {true | false} check
 */
const checkPass = async function (password,hashpass) {
	const check = await bcrypt.compare(password, hashpass);
	return check;
}
module.exports = {
    hashPass,
    checkPass
}