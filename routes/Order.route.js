const express = require('express');
const router = express.Router();
const OrdersCtrl = require('../controllers/Orders.controller');
const Validation = require('../middleware/Validator');

router.post('/add',Validation.addOrder,OrdersCtrl.addOrders)

router.patch('/update',OrdersCtrl.editOrder)

router.delete('/delete',OrdersCtrl.deleteByID)

router.get('/list_Orderuser/:id_user', OrdersCtrl.listOrders)

router.get('/list/:id', OrdersCtrl.ordersID)

module.exports = router;
