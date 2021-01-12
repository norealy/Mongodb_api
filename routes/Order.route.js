const express = require('express');
const router = express.Router();
const OrdersCtrl = require('../controllers/Orders.controller');
const Validation = require('../middleware/Validator');

router.post('/add',Validation.addOrder,OrdersCtrl.addOrders)

router.patch('/update',Validation.editOrder,OrdersCtrl.editOrder)

router.delete('/delete',Validation.deleteOrder,OrdersCtrl.deleteByID)

router.get('/list_Orderuser', OrdersCtrl.listOrders)

router.get('/list_OrderId/:id', OrdersCtrl.ordersID)

module.exports = router;
