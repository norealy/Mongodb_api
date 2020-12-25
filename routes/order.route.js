const express = require('express');
const router = express.Router();
const ordersCtrl = require('../controllers/orders.controller');


router.post('/add', ordersCtrl.addOrders)
// {
//     "id":"5fe56bf480b0ea36aa5823fb",
// 	"id_user": "5fe4f1816b25df78cdcf26a9",
// 	"bill_date": "time123",
// 	"total_money": 4000000,
// 	"Orders_details": [
//         {
//             "id_product":"2",
//             "count_product":6
//         },
//          {
//             "id_product":"3",
//             "count_product":2
//         }
//     ]
// }

router.patch('/update', ordersCtrl.EditOrder) // chua duoc

router.get('/list',ordersCtrl.listOrders)

router.get('/list/:id', ordersCtrl.ordersID)

router.delete('/delete', ordersCtrl.deleteByID)
// {
// 	"id": "5fe4f1926b25df78cdcf26ac"
// }

module.exports = router;

