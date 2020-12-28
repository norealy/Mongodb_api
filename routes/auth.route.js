const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth.controller');

const Validation = require('../middleware/checktype');

router.get('/login', async (req, res) => {
	res.send("get login !");
});

router.post('/login' , Validation.login ,Auth.login);
router.post('/admin/login', Validation.login , Auth.adminLogin)

router.get('/register', async (req, res) => {
	res.send("get register !");
});

router.post('/register', Validation.register ,Auth.register);

router.get('/logout', async (req, res) => {
	res.send("get logout !");
});

router.post('/logout', async (req, res) => {
	res.send("POst logout !");
});

module.exports = router