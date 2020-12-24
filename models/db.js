const mongoose = require('mongoose');
let uri = 'mongodb+srv://local:local@xdatgd.hx1qo.mongodb.net/Mongodb_app?retryWrites=true&w=majority'
exports.connect = mongoose.connect(uri,{useUnifiedTopology:true,useNewUrlParser:true},err=>{
  if(err){
    console.log("error : ",err);
  }else{
    console.log("Connect to mongodb success ! : ");
  }
});
