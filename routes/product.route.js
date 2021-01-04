const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');
const Validation = require('../middleware/checktype');
const veryToken = require('../middleware/veryToken');

router.post('/add' ,Validation.addProduct ,productCtrl.addProduct)

router.put('/update' ,Validation.UpdateProduct,productCtrl.changeInfo)

router.delete('/delete', productCtrl.deleteByID)

router.get('/list', productCtrl.listProducts)

router.post('/list/seller', productCtrl.Product_seller)

router.post('/list/categories', productCtrl.Product_byCategories)

router.get('/list/:id', productCtrl.ProductID)

module.exports = router;
