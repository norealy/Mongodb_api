const express = require('express');
const router = express.Router();
const Auth = require('../controllers/Auth.controller');
const Validation = require('../middleware/Validator.middleware');

router.get('/login',(req,res)=>{
	let path = __dirname.split('/');
	path.pop();
	path = path.join('/')
	const file = path + '/views/login.html';
    res.sendFile(file);
})
router.get('/register',(req,res)=>{
	let path = __dirname.split('/');
	path.pop();
	path = path.join('/');
	const file = path + '/views/register.html';
    res.sendFile(file);
})

router.get('/login-microsoft',Auth.redirectMicrosoft)

router.get('/microsoft',Auth.getDataUserAzure)

router.get('/login-google',Auth.getRidirectGG)

router.get('/google',Auth.getDataUserGG)

router.post('/login' , Validation.login ,Auth.login);

router.post('/admin/login', Validation.login , Auth.adminLoginAuth)

router.post('/register', Validation.register ,Auth.register);

router.post('/logout', async (req, res) => {
	res.send("POst logout !");
});

module.exports = router