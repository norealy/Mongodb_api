const express = require('express');
const router = express.Router();
const AdminCtrl = require('../controllers/Admin.controller');
const Validation = require('../middleware/Validator.middleware');

router.post('/add', Validation.register , AdminCtrl.addAdmin)

router.patch('/change-password',Validation.changePassword , AdminCtrl.changePass)

router.put('/update/info',Validation.updateInfo, AdminCtrl.changeInfo)

router.get('/list',AdminCtrl.listUsers)

router.get('/list/:id', AdminCtrl.userID)

router.delete('/delete/id', Validation.deleteIdUser,AdminCtrl.deleteByID)

router.delete('/delete/username',Validation.deleteUsername, AdminCtrl.deleteByUsername)

module.exports = router;
