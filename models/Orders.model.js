const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    id_user: { type: String,required:true},
    bill_date:{ type: Date, default: Date.now() },
    total_money :Number,
    Orders_details:[
      {
        id_product:String,
        count_product:Number
      },
    ]
});

const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders