const express = require('express');
const router = express.Router();
const ordersCtrl = require('../controllers/orders.controller');
const Validation = require('../middleware/checktype');

router.post('/add',Validation.validationOrder ,ordersCtrl.addOrders)
// {
//     "id_user":"5fe91d9e893b5d1db88ae1d6",
//     "Orders_details":[{
//         "id_product":"5fe927b59d04b12bfcf8fb98", 
//         "count_product":2
//     },
//     {
//         "id_product":"5fe927d19d04b12bfcf8fb9a",
//         "count_product":5
//     }]
// }

router.patch('/update', ordersCtrl.EditOrder)
// {
//     "id":"5fe56bc980b0ea36aa5823f8",
//     "id_product":"2",
//     "count_product":10
// }

router.get('/list',ordersCtrl.listOrders)

router.get('/list/:id', ordersCtrl.ordersID)

router.delete('/delete', ordersCtrl.deleteByID)
// {
// 	"id": "5fe4f1926b25df78cdcf26ac"
// }

module.exports = router;
