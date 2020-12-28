const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users.controller');
const Validation = require('../middleware/checktype');
const veryToken = require('../middleware/veryToken');

router.post('/add' ,veryToken.verifyADminAccessToken, Validation.register, userCtrl.addUser)

router.patch('/update/password', userCtrl.changePass)
// {
//     "id":"5fe4f1796b25df78cdcf26a8",
//     "password": "password2222222"
// }

router.put('/update/info', userCtrl.changeInfo)
// {
// 	"id": "5fe4f1796b25df78cdcf26a8",
// 	"fullname": "Nguyen Van Datttt",
// 	"avatar": "12133",
// 	"phone": "0332302626666",
// 	"address": "NKT-CG-HNNN"
// }
router.get('/list',veryToken.verifyADminAccessToken,userCtrl.listUsers)

router.get('/list/:id',veryToken.verifyADminAccessToken, userCtrl.userID)

router.delete('/delete/id',veryToken.verifyADminAccessToken, userCtrl.deleteByID)
// {
// 	"id": "5fe4f1926b25df78cdcf26ac"
// }
router.delete('/delete/username',veryToken.verifyADminAccessToken, userCtrl.deleteByUsername)
// {
// 	"username": "username5"
// }
module.exports = router;
