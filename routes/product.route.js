const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');


router.post('/add', productCtrl.addProduct)
// {
// 	"username": "username1",
// 	"password": "password1",
// 	"fullname": "Nguyen Van Dat",
// 	"avatar": "",
// 	"phone": "0332302626",
// 	"address": "NKT-CG-HN"
// }

router.put('/update', productCtrl.changeInfo)
// {
// 	"id": "5fe4f1796b25df78cdcf26a8",
// 	"fullname": "Nguyen Van Datttt",
// 	"avatar": "12133",
// 	"phone": "0332302626666",
// 	"address": "NKT-CG-HNNN"
// }

router.get('/list',productCtrl.listProducts)

router.get('/list/:id', productCtrl.ProductID)

router.post('/list/seller', productCtrl.Product_seller)

router.post('/list/categories', productCtrl.Product_byCategories)

router.delete('/delete/id', productCtrl.deleteByID)
// {
// 	"id": "5fe4f1926b25df78cdcf26ac"
// }

module.exports = router;
