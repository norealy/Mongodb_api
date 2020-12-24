const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  fullname :String,
  avatar :String,
  phone:String,
  address:String,
 });

 const Users = mongoose.model("Users", userSchema);
  module.exports = Users