const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin.controller');
const Validation = require('../middleware/checktype');

router.post('/add', Validation.register , adminCtrl.addAdmin)

router.patch('/change-password',Validation.ChangePassword , adminCtrl.changePass)

router.put('/update/info',Validation.UpdateInfo, adminCtrl.changeInfo)

router.get('/list',adminCtrl.listUsers)

router.get('/list/:id', adminCtrl.userID)

router.delete('/delete/id', Validation.DeleteIdUser,adminCtrl.deleteByID)

router.delete('/delete/username',Validation.DeleteUsername, adminCtrl.deleteByUsername)

module.exports = router;
