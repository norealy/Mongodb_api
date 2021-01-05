const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {type: String},
  password: String ,
  authType:{
    type:String,
    enum:['local','google','microsoft'],
    default:'local'
  },
  authID:{
    type:String,
    default:null,
    unique:true
  },
  fullname :String,
  avatar :String,
  phone:String,
  email:String,
  address:String,
 });
const Users = mongoose.model("Users", userSchema);
module.exports = Users