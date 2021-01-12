const express = require('express');
const router = express.Router();
const AdminCtrl = require('../controllers/Admin.controller');
const Validation = require('../middleware/Validator');

router.patch('/change-password',Validation.changePassword , AdminCtrl.changePass)

router.put('/update/info',Validation.updateInfo, AdminCtrl.changeInfo)

router.get('/list',AdminCtrl.listAdmin)

router.get('/list/:id', AdminCtrl.adminByID)

router.delete('/delete/id', Validation.deleteIdUser,AdminCtrl.deleteByID)

router.delete('/delete/username',Validation.deleteUsername, AdminCtrl.deleteByUsername)

module.exports = router;
