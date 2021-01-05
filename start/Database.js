const Env = require('../utils/Env');
const mongoose = require('mongoose');
let uri = process.env.DB_URI || '';
const MongoConnect = () => {
	console.log(Env.getOrFail('URI'))
	mongoose.connect(Env.getOrFail('URI'), {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true
	}) //
		.then(() => console.log('Connect to mongodb success ! : '))
		.catch((error) =>{

			process.exit(0)
		});
};
module.exports = MongoConnect;
