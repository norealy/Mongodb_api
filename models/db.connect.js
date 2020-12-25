require('dotenv').config();
const mongoose = require('mongoose');
let uri = process.env.URI || '';
const MongoConnect = () => {
	try {
		mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true ,useFindAndModify: false , useCreateIndex: true})
			.then(()=>console.log('Connect to mongodb success ! : '))
			.catch((error)=>console.log('Connect to mongodb Fail ! : ',error))
			
	} catch (error) {
    
  }
};
module.exports = MongoConnect;
