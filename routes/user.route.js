const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users.controller');
const Validation = require('../middleware/checktype');
const veryToken = require('../middleware/veryToken');

router.post('/add' ,veryToken.verifyADminAccessToken, Validation.register, userCtrl.addUser)

router.patch('/change-password',veryToken.verifyAccessToken,Validation.ChangePassword,userCtrl.changePass)
// {
//     "id":"5fe4f1796b25df78cdcf26a8",
//     "password": "password2222222",
//     "newPassword": "password2222233"
// }

router.patch('/forget-password',Validation.ForgetPassword ,userCtrl.forgetPassword)
// {
//     "id":"5fe4f1796b25df78cdcf26a8",
//     "password": "password2222222"
// }

router.put('/update/info', Validation.UpdateInfo,userCtrl.changeInfo)
// {
// 	"id": "5fe4f1796b25df78cdcf26a8",
// 	"fullname": "Nguyen Van Datttt",
// 	"avatar": "12133",
// 	"phone": "0332302626666",
// 	"address": "NKT-CG-HNNN"
// }
router.get('/list',veryToken.verifyADminAccessToken,userCtrl.listUsers)

router.get('/list/:id',veryToken.verifyADminAccessToken, userCtrl.userID)

router.delete('/delete/id',veryToken.verifyADminAccessToken, Validation.DeleteIdUser,userCtrl.deleteByID)
// {
// 	"id": "5fe4f1926b25df78cdcf26ac"
// }
router.delete('/delete/username',veryToken.verifyADminAccessToken,Validation.DeleteUsername, userCtrl.deleteByUsername)
// {
// 	"username": "username5"
// }
module.exports = router;
