const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users.controller');
const Validation = require('../middleware/checktype');


router.patch('/account/change-password',Validation.ChangePassword,userCtrl.changePass)

router.patch('/account/forget-password',Validation.ForgetPassword ,userCtrl.forgetPassword)

router.put('/account/update-info', Validation.UpdateInfo,userCtrl.changeInfo)

router.post('/add' , Validation.register, userCtrl.addUser)

router.get('/list',userCtrl.listUsers)

router.get('/list/:id', userCtrl.userID)

router.delete('/delete-id', Validation.DeleteIdUser,userCtrl.deleteByID)

router.delete('/delete-username',Validation.DeleteUsername, userCtrl.deleteByUsername)

module.exports = router;
