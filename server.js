require('dotenv').config();
const port = process.env.PORT || 2000;
const express = require('express');
const bodyParser = require('body-parser');
const dbMongoConnect = require('./models/db.connect')
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const orderRoute = require('./routes/order.route');
const authRoute = require('./routes/auth.route');
const app = express();
dbMongoConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/users',userRoute);
app.use('/order',orderRoute);
app.use('/auth',authRoute);
app.use('/product',productRoute);

app.get('/', (req, res) => {
	res.send('Client run !');
});

app.listen(port, () => {
	console.log(`Server started on ${port}`);
});
