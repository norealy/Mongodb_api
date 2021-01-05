const express = require('express');
const router = express.Router();
const ProductCtrl = require('../controllers/Product.controller');
const Validation = require('../middleware/Validator.middleware');

router.post('/add' ,Validation.addProduct ,ProductCtrl.addProduct)

router.put('/update' ,Validation.updateInfo,ProductCtrl.changeInfo)

router.delete('/delete', ProductCtrl.deleteByID)

router.get('/list', ProductCtrl.listProducts)

router.post('/list/seller', ProductCtrl.productShowSeller)

router.post('/list/categories', ProductCtrl.productByCategories)

router.get('/list/:id', ProductCtrl.productID)

module.exports = router;
