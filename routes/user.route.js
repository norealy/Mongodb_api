const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users.controller');


router.post('/add', userCtrl.addUser)
// {
// 	"username": "username1",
// 	"password": "password1",
// 	"fullname": "Nguyen Van Dat",
// 	"avatar": "",
// 	"phone": "0332302626",
// 	"address": "NKT-CG-HN"
// }

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
router.get('/list',userCtrl.listUsers)

router.get('/list/:id', userCtrl.userID)

router.delete('/delete/id', userCtrl.deleteByID)
// {
// 	"id": "5fe4f1926b25df78cdcf26ac"
// }
router.delete('/delete/username', userCtrl.deleteByUsername)
// {
// 	"username": "username5"
// }
module.exports = router;
