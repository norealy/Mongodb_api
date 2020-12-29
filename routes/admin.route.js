const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin.controller');

const Validation = require('../middleware/checktype');


router.post('/add', Validation.register , adminCtrl.addAdmin)

router.patch('/change-password',Validation.ChangePassword , adminCtrl.changePass)
// {
//     "id":"5fe4f1796b25df78cdcf26a8",
//     "password": "password2222222"
// }

router.put('/update/info',Validation.UpdateInfo, adminCtrl.changeInfo)
// {
// 	"id": "5fe4f1796b25df78cdcf26a8",
// 	"fullname": "Nguyen Van Datttt",
// 	"avatar": "12133",
// 	"phone": "0332302626666",
// 	"address": "NKT-CG-HNNN"
// }
router.get('/list',adminCtrl.listUsers)

router.get('/list/:id', adminCtrl.userID)

router.delete('/delete/id', Validation.DeleteIdUser,adminCtrl.deleteByID)
// {
// 	"id": "5fe4f1926b25df78cdcf26ac"
// }
router.delete('/delete/username',Validation.DeleteUsername, adminCtrl.deleteByUsername)
// {
// 	"username": "username5"
// }
module.exports = router;
