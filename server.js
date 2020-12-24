require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User.model');
const port = process.env.PORT || 2000;
const app = express();
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let uri = process.env.URI || "";
mongoose.connect(
	uri,
	{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true },
	(err) => {
		if (err) {
			console.log('error : ', err);
		} else {
			console.log('Connect to mongodb success ! : ');
		}
	}
);

app.get('/', (req, res) => {
	res.send('Client run !');
});

app.get('/user-list', async (req, res) => {
	let arrayUser = await User.find();
	res.send(arrayUser);
});

app.post('/user-add', async (req, res) => {
	let usrInfo = req.body;
	let newuser = new User(usrInfo);
	await newuser.save(function (err, data) {
		if (err) return console.error(err);
		console.log(data);
		res.send(data);
	});
});

app.post('/user-add-list', async (req, res) => {
	let usrInfo = req.body;
	await User.create(usrInfo, function (err, data) {
		if (err) return console.error(err);
		return res.send(data);
	});
});

app.delete('/user-delete/id', async (req, res) => {
	if (req.body.id) {
		await User.remove({ _id: req.body.id }, function (err, data) {
			if (err) return console.error(err);
			return res.send(data);
		});
	} else {
		req.send('Not remove id empty !');
	}
});

app.delete('/user-delete/users', async (req, res) => {
	if (req.body.name) {
		await User.deleteMany({ name: req.body.name }, function (err, data) {
			if (err) return console.error(err);
			return res.send(data);
		});
	} else {
		req.send('Not remove id empty !');
	}
});
app.put('/user-update/name', async (req, res) => {
	let user = req.body;
	await User.findOneAndUpdate({ _id: user.id }, { name: user.name }, { new: true }, function (err, data) {
		if (err) return console.error(err);
		return res.send(data);;
	});
});

app.patch('/user-update/password', async (req, res) => {
	let user = req.body;
  await User.findOneAndUpdate(
    {"_id": user.id},
    {"password": user.password},
    {new:true},
    function (err, data) {
      if(err) return console.error(err)
      return res.send(data);;
   })
});

app.listen(port, () => {
	console.log(`Server started on ${port}`);
});
