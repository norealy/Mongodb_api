const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth.controller');
const Validation = require('../middleware/checktype');

router.post('/login' , Validation.login ,Auth.login);

router.post('/admin/login', Validation.login , Auth.adminLogin)

router.post('/register', Validation.register ,Auth.register);

router.post('/logout', async (req, res) => {
	res.send("POst logout !");
});

module.exports = router