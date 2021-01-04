'use strict';
require('dotenv').config();
const crypto = require('crypto');
const secretRefeshKey = process.env.JWS_REFRESH_TOKEN_KEY || "U2ltcGx5IGVudGVyIHlvdXIgZGF0YSB0aGVuIHB1c2ggdGhlIGVuY29kZSBidXR0b24u";
const IV = process.env.REFRESH_IV || 'GVuIHB1c2ggdGhlI'

/**
 * 
 * @param {string} uid_token 
 */
exports.encryptoken = function(uid_token){
	var cipher = crypto.Cipher('aes-256-gcm', Buffer.from(secretRefeshKey,'hex'),IV);
	var token = cipher.update(uid_token, 'utf8', 'hex')
	token += cipher.final('hex');
	console.table({IV:IV.toString('hex'),encrypted: token})
	return token;
};
/**
 * 
 * @param {string} tokenString 
 */
exports.decryptToken = function (tokenString) {
    const decipher = crypto.Decipher('aes-256-gcm', Buffer.from(secretRefeshKey,'hex'),Buffer.from(IV,'hex'));
    // decipher.setAutoPadding(false);
    let token_id = decipher.update(tokenString, 'hex', 'utf8');
    return token_id;
}
