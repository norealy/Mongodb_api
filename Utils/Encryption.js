
const crypto = require('crypto');
const refreshSecret = process.env.REFRESH_SECRET || "U2ltcGx5IGVudGVyIHlvdXIgZGF0YSB0aGVuIHB1c2ggdGhlIGVuY29kZSBidXR0b24u";
const IV = process.env.REFRESH_IV || 'GVuIHB1c2ggdGhlI'

/**
 * 
 * @param {string} uidToken 
 */
const encryptToken = function(tokenId){
	let cipher = crypto.Cipher('aes-256-gcm', Buffer.from(refreshSecret,'hex'),IV);
	let token = cipher.update(tokenId, 'utf8', 'hex')
	token += cipher.final('hex');
	console.table({IV:IV.toString('hex'),encrypted: token})
	return token;
};
/**
 * 
 * @param {string} tokenString 
 */
const decryptToken = function (tokenString) {
    const decipher = crypto.Decipher('aes-256-gcm', Buffer.from(refreshSecret,'hex'),Buffer.from(IV,'hex'));
    // decipher.setAutoPadding(false);
    let token_id = decipher.update(tokenString, 'hex', 'utf8');
	return token_id;
}
module.exports = {
	encryptToken,
	decryptToken
}