const Orders = require('../models/Orders.model');
const Products = require('../models/Product.model');

const listOrders = async (req, res) => {
    try {
      let arrayOrders = await Orders.find({ "id_user": req.uid });
      return res.status(200).send(arrayOrders);
    } catch (error) {
      return res.status(401).send("Fail");
    }
};

const ordersID = async (req, res) => {
    try {
      let order = await Orders.findOne({ "_id": req.params.id , "id_user": req.uid});
      if(!order || order == null){
        return res.status(401).send("Fail");
      }
      return res.status(200).send(order);
    } catch (error) {
      return res.status(401).send("Fail");
    }
};

const addOrders = async (req, res) => {
  try {
    const arrProduct = req.body.Orders_details;
    let total_money = 0;
    for (let i = 0; i < arrProduct.length; i++) {
      const prodOrder = arrProduct[i];
      const product = await Products.findOne({ "_id": prodOrder.id_product });
      total_money += product.price * prodOrder.count_product;
    }
    req.body.total_money = total_money;
    
    let orderr = req.body;
    orderr.id_user = req.uid;
    let newOrders = new Orders(orderr);
    await newOrders.save(function (err, data) {
      if (err) return res.status(401).send("Fail");
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.status(401).send("Fail");
  }
};

const editOrder = async (req, res) => {
  if (!req.body.id||!req.body.count_product||!req.body.id_product) return res.status(401).send("Fail");
  try {
    let orders = req.body;
    await Orders.findOneAndUpdate(
      { "_id": orders.id , "id_user":req.uid},
      { $set: { "Orders_details.$[element].count_product": orders.count_product } },
      {
        multi: true,
        arrayFilters: [{ "element.id_product": orders.id_product }]
      },
      function (err, data) {
        if (err) return res.status(401).send("Fail");
        if (data===null) return res.status(401).send("Fail");
        return res.status(200).send(data);
      });
  } catch (error) {
    return res.status(401).send("Fail");
  }
};

const deleteByID = async (req, res) => {
    try {
      const orderDelte = await Orders.findOneAndRemove({ "_id": req.body.id_order, "id_user": req.uid })
      if (orderDelte) {
        return res.status(200).send(orderDelte);
      } else {
        return res.status(401).send("Fail");
      }
    } catch (error) {
      return res.status(401).send("Fail");
    }
};

module.exports = {
  listOrders,
  ordersID,
  addOrders,
  editOrder,
  deleteByID,
}