const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');
const Validation = require('../middleware/checktype');
const veryToken = require('../middleware/veryToken');

router.post('/add', Validation.validationProduct ,productCtrl.addProduct)
// {
//     "id_seller":"5fe91d9e893b5d1db88ae1d6",
//     "image":"x",
//     "price":-1100,
//     "description":"Iphone 11 Pro max",
//     "count_product":12,
//     "Categories":{"name":"Điện thoại"}
// }
router.put('/update',veryToken.verifyAccessToken ,productCtrl.changeInfo)

router.get('/list', productCtrl.listProducts)

router.get('/list/:id', productCtrl.ProductID)

router.post('/list/seller', productCtrl.Product_seller)

router.post('/list/categories', productCtrl.Product_byCategories)

router.delete('/delete/id',veryToken.verifyAccessToken, productCtrl.deleteByID)
// {
// 	"id": "5fe4f1926b25df78cdcf26ac"
// }

module.exports = router;
