const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    id_seller: { type: String, required: true},
    image:String,
    price :{type:Number, required: true},
    description :{type:String, required: true},
    count_product:{type:Number, required: true},
    Categories:{
      name:String,
    },
 });

const Products = mongoose.model("Products", productSchema);
module.exports = Products