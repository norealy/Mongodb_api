const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    id_seller: { type: String, required: true },
    image:String,
    price :Number,
    description :String,
    count_product:Number,
    Categories:[{
      name:String,
    }],
 });

const Products = mongoose.model("Products", productSchema);
module.exports = Products