const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  username: { type: String, required: true ,unique:true},
  password: { type: String, required: true },
  fullname :String,
  avatar :String,
  phone:String,
  address:String,
 });

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin