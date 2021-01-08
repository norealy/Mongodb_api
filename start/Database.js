const mongoose = require('mongoose');
let uri = process.env.DB_URI || '';
const MongoConnect = () => {
	mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
		.then(() => console.log('Connect to mongodb success ! : '))
		.catch((error) => process.exit(0));
};
module.exports = MongoConnect;
