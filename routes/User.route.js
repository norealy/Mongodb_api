const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/Users.controller');
const Validation = require('../middleware/Validator.middleware');


router.patch('/account/change-password',Validation.changePassword,UserCtrl.changePass)

router.patch('/account/forget-password',Validation.forgetPassword ,UserCtrl.forgetPassword)

router.put('/account/update-info', Validation.updateInfo,UserCtrl.changeInfo)

router.post('/add' , Validation.register, UserCtrl.addUser)

router.get('/list',UserCtrl.listUsers)

router.get('/list/:id', UserCtrl.userID)

router.delete('/delete-id', Validation.deleteIdUser,UserCtrl.deleteByID)

router.delete('/delete-username',Validation.deleteUsername, UserCtrl.deleteByUsername)

module.exports = router;
