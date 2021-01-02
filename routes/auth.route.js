const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth.controller');
const Validation = require('../middleware/checktype');

router.get('/login',(req,res)=>{
	console.log("__dirname: "+__dirname);
	let path = __dirname.split('/');
	path.pop();
	path=path.join('/')
	console.log('Path: '+path)
	const file = path + '/views/login.html';
    res.sendFile(file)
})
router.get('/register',(req,res)=>{
	console.log("__dirname: "+__dirname);
	let path = __dirname.split('/');
	path.pop();
	path=path.join('/')
	console.log('Path: '+path)
	const file = path + '/views/register.html';
    res.sendFile(file)
})

router.get('/login-microsoft',Auth.redirectMicrosoft)

router.get('/microsoft',Auth.getDataUser)

router.post('/login' , Validation.login ,Auth.login);

router.post('/admin/login', Validation.login , Auth.adminLogin)

router.post('/register', Validation.register ,Auth.register);

router.post('/logout', async (req, res) => {
	res.send("POst logout !");
});

module.exports = router