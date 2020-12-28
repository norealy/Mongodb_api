const mongoose = require('mongoose');
const { Schema } = mongoose;

const SellerSchema = new Schema({
  username: { type: String, required: true ,unique:true},
  password: { type: String, required: true },
  fullname :String,
  avatar :String,
  phone:String,
  email:String,
  address:String,
 });

 const Sellers = mongoose.model("Sellers", SellerSchema);
  module.exports = Sellers