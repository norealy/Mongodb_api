const Orders = require('../models/Orders.model');
const Products = require('../models/Product.model');

const listOrders = async (req, res) => {
  if(req.params.id_user){
    try {
      let arrayOrders = await Orders.find({"id_user":req.params.id_user});
      res.send(arrayOrders);
      return;
    } catch (error) {
      res.send(error);
      return;
    }
  }else{
    res.send("Not null id user");
    return;
  }
  
};
  
const ordersID = async (req, res) => {
  if(req.params.id){
    let order = await Orders.findOne({"_id":req.params.id});
    return res.send(order);
  }else{
    return res.send("Not found !");
  }
};

const addOrders = async (req, res) => {
  if (req.body) {
    const arrProduct = req.body.Orders_details;
    let total_money = 0;
    for (let i = 0; i < arrProduct.length; i++) {
      const prodOrder = arrProduct[i];
      const product = await Products.findOne({"_id":prodOrder.id_product});
      total_money += product.price*prodOrder.count_product;
    }
    req.body.total_money = total_money;
    let orderr = req.body;
    let newOrders = new Orders(orderr);
    await newOrders.save(function (err, data) {
      if (err) return console.error(err);
      res.send(data);
    });
  }
};

const editOrder = async (req, res) => {
  if(req.body.id){
    let orders = req.body;
    await Orders.findOneAndUpdate(
    { "_id": orders.id }, 
    {$set : {"Orders_details.$[element].count_product":orders.count_product}}, 
    {
      multi: true,
      arrayFilters: [ {"element.id_product":orders.id_product } ]
    },
    function (err, data) {
      if (err) return console.error(err);
      return res.send(data);
  });
  }else{
    return res.send("Change info fail !");
  }
};


const deleteByID = async (req, res) => {
  if (req.body.id_order&&req.body.id_user) {
    try {
        const orderDelte = await Orders.findOneAndRemove({ "_id": req.body.id_order,"id_user":req.body.id_user })
        if(orderDelte){
          return res.send(orderDelte);
        }else{
          return res.send('Not found id !');
        }
    } catch (error) {
      return res.send('Not remove !');
    }
  } else {
    return res.send('Not remove id empty !');
  }
};

module.exports = {
  listOrders,
  ordersID,
  addOrders,
  editOrder,
  deleteByID,
}