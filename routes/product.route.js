const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');
const Validation = require('../middleware/checktype');
const veryToken = require('../middleware/veryToken');

router.post('/add', veryToken.verifyAccessToken ,Validation.addProduct ,productCtrl.addProduct)

router.put('/update',veryToken.verifyAccessToken ,Validation.UpdateProduct,productCtrl.changeInfo)

router.delete('/delete',veryToken.verifyAccessToken, productCtrl.deleteByID)

router.get('/list', productCtrl.listProducts)

router.post('/list/seller', productCtrl.Product_seller)

router.post('/list/categories', productCtrl.Product_byCategories)

router.get('/list/:id', productCtrl.ProductID)

module.exports = router;
