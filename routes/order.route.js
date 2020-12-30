const express = require('express');
const router = express.Router();
const ordersCtrl = require('../controllers/orders.controller');
const Validation = require('../middleware/checktype');

router.post('/add',Validation.addOrder,ordersCtrl.addOrders)

router.patch('/update',ordersCtrl.EditOrder)

router.delete('/delete',ordersCtrl.deleteByID)

router.get('/list_Orderuser/:id_user', ordersCtrl.listOrders)

router.get('/list/:id', ordersCtrl.ordersID)

module.exports = router;
