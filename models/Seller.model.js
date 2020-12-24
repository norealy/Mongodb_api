const mongoose = require('mongoose');
const { Schema } = mongoose;

const SellerSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  fullname :String,
  avatar :String,
  phone:String,
  address:String,
 });

 const Sellers = mongoose.model("Sellers", SellerSchema);
  module.exports = Sellers