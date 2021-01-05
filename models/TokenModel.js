const mongoose = require('mongoose')
const { Schema } = mongoose;
const tokenSchema = new Schema({
    user_uid:String,
    uid_token:String,
    is_revoke: Boolean, //check logout
    created_At:Number,
    updated_at:Number
})

module.exports = mongoose.model('Tokens',tokenSchema)