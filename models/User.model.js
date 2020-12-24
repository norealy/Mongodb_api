const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  age : Number,
  favoriteFoods: [],
 });

 const User = mongoose.model("User", userSchema,'xdatgd');
  module.exports = User