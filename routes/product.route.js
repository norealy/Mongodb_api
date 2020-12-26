const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');


router.post('/add', productCtrl.addProduct)

router.put('/update', productCtrl.changeInfo)

router.get('/list',productCtrl.listProducts)

router.get('/list/:id', productCtrl.ProductID)

router.post('/list/seller', productCtrl.Product_seller)

router.post('/list/categories', productCtrl.Product_byCategories)

router.delete('/delete/id', productCtrl.deleteByID)
// {
// 	"id": "5fe4f1926b25df78cdcf26ac"
// }

module.exports = router;
