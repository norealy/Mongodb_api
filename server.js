require('dotenv').config();
const port = process.env.PORT || 2000;
const express = require('express');
const bodyParser = require('body-parser');
const dbMongoConnect = require('./models/db.connect')
const Routes = require('./routes');
const app = express();
dbMongoConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

Routes(app);

app.listen(port, () => {
	console.log(`Server started on ${port}`);
});
