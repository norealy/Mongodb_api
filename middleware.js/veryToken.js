require('dotenv').config();
const crypto = require('crypto');
const secretRefeshKey = process.env.REFRESH_TOKEN_KEY || "U2ltcGx5IGVudGVyIHlvdXIgZGF0YSB0aGVuIHB1c2ggdGhlIGVuY29kZSBidXR0b24u";
/* 'f3788711260a86868ce30c88ca3ce99a'│
'81240af6d18fe3a2f0c3a2ab2fbebe4fa119d7f2c73cb60ad9d00731110c5feb2d9e429b'  */
const IV = process.env.IV || 'f3788711260a86868ce30c88ca3ce99a'
let refresh_token = "d52d5da482dae3a1f093f5a927bebe4ea64fd7a8c13ce50adb875766425954eb2f91159a"
function verifyRefresh(tokenString) {
    const decipher = crypto.Decipher('aes-256-gcm', Buffer.from(secretRefeshKey,'hex'),Buffer.from(IV,'hex'));
    // decipher.setAutoPadding(false);
    let token_id = decipher.update(tokenString, 'hex', 'utf8');
    // token_id += decipher.final('ascii')
    return token_id;
}
const key = verifyRefresh(refresh_token)
console.log("KEY : ",key)

