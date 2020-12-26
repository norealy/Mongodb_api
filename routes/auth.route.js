const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const User = require('../models/Users.model');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/login', async (req, res) => {
	res.send("get login !");
});
router.post('/login', async (req, res) => {
	res.send("POst login !");
});
router.get('/logout', async (req, res) => {
	res.send("get logout !");
});
router.post('/logout', async (req, res) => {
	res.send("POst logout !");
});

module.exports = router