const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/Users.controller');
const Validation = require('../middleware/Validator');


router.patch('/account/change-password',Validation.changePassword,UserCtrl.changePass);

router.put('/account/update-info', Validation.updateInfo,UserCtrl.changeInfo);

router.get('/account',UserCtrl.userAccount);

router.get('/list',UserCtrl.listUsers);

router.get('/list/:id', UserCtrl.userID);

router.delete('/delete-id', Validation.deleteIdUser,UserCtrl.deleteByID);

router.delete('/delete-username',Validation.deleteUsername, UserCtrl.deleteByUsername);

module.exports = router;
