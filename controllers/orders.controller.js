const Orders = require('../models/Orders.model');

exports.listOrders = async (req, res) => {
  let arrayOrders = await Orders.find();
  return res.send(arrayOrders);
};
  
exports.ordersID = async (req, res) => {
  if(req.params.id){
    let order = await Orders.findOne({"_id":req.params.id});
    return res.send(order);
  }else{
    return res.send("Not found !");
  }
};

exports.addOrders = async (req, res) => {
  if (req.body) {
    let orderr = req.body;
    let newOrders = new Orders(orderr);
    await newOrders.save(function (err, data) {
      if (err) return console.error(err);
      console.log(data);
      res.send(data);
    });
  }
};

exports.EditOrder = async (req, res) => {
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


exports.deleteByID = async (req, res) => {
  if (req.body.id) {
    await Orders.remove({ "_id": req.body.id }, function (err, data) {
      if (err) return console.error(err);
      return res.send(data);
    });
  } else {
    req.send('Not remove id empty !');
  }
};
