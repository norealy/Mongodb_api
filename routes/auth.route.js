const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const User = require('../models/Users.model');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/auth/login', async (req, res) => {
	res.send("get login !");
});
router.post('/auth/login', async (req, res) => {
	res.send("POst login !");
});
router.get('/auth/logout', async (req, res) => {
	res.send("get logout !");
});
router.post('/auth/logout', async (req, res) => {
	res.send("POst logout !");
});

module.exports = router