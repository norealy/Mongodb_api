const express = require('express');
const path = require("path");
const router = express.Router();
const Auth = require('../controllers/Auth.controller');
const User = require('../controllers/Users.controller');
const Validation = require('../middleware/Validator');

router.get('/login',(req,res)=>{
	let file = path.resolve(__dirname, '..', 'views', 'login.html')
    res.sendFile(file);
});
router.get('/register',(req,res)=>{
	let file = path.resolve(__dirname, '..', 'views', 'register.html')
    res.sendFile(file);
});

router.get('/login-microsoft',Auth.redirectMicrosoft)

router.get('/microsoft',Auth.getDataUserAzure)

router.get('/login-google',Auth.getRidirectGG)

router.get('/google',Auth.getDataUserGG)

router.post('/login' , Validation.login ,Auth.login);

router.post('/admin/login', Validation.login , Auth.adminLoginAuth)

router.post('/register', Validation.register ,Auth.register);

router.patch('/forget-password',Validation.forgetPassword ,User.forgetPassword)

router.post('/logout', async (req, res) => {
	res.send("POst logout !");
});

module.exports = router