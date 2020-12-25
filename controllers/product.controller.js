const Product = require('../models/Product.model');
exports.listProducts = async (req, res) => {
	let arrayProduct = await Product.find();
	return res.send(arrayProduct);
};

exports.ProductID = async (req, res) => {
	if (req.params.id) {
		let Product = await Product.findOne({ _id: req.params.id });
		return res.send(Product);
	} else {
		return res.send('Not found !');
	}
};
exports.Product_byCategories = async (req, res) => {
	if (req.body.category_name) {
		
		return res.send('ok !');
	} else {
		return res.send('Not found !');
	}
};
exports.Product_seller = async (req, res) => {
	if (req.params.id_seller) {
		let Products = await Product.find({ id_seller: req.params.id_seller });
		return res.send(Products);
	} else {
		return res.send('Not found !');
	}
};

exports.addProduct = async (req, res) => {
	if (req.body) {
		let product = req.body;
		let newProduct = new Product(product);
		await newProduct.save(function (err, data) {
			if (err) return console.error(err);
			console.log(data);
			res.send(data);
		});
	}
};

exports.updateCount = async (req, res) => {
	if (req.body.id) {
		let product = req.body;
		await Product.find({ _id: req.body.id }, async function (err, data) {
			if (err) return console.error(err);
			await Product.findOneAndUpdate(
				{ _id: product.id },
				{
					"count_product": data.count_product - product.count_selled
				},
				{ new: true },
				function (err, data) {
					if (err) return console.error(err);
					return res.send(data);
				}
			);
		});
		
		
	} else {
		return res.send('Change info fail !');
	}
};

exports.changeInfo = async (req, res) => {
	if (req.body.id) {
		let product = req.body;
		await Product.findOneAndUpdate(
			{ _id: product.id },
			{
				"image": product.image,
				"price": product.price,
				"description": product.description,
				"count_product": product.count_product,
				"Categories.name" : product.Categories.name
			},
			{ new: true },
			function (err, data) {
				if (err) return console.error(err);
				return res.send(data);
			}
		);
	} else {
		return res.send('Change info fail !');
	}
};

exports.deleteByID = async (req, res) => {
	if (req.body.id) {
		await Product.remove({ _id: req.body.id }, function (err, data) {
			if (err) return console.error(err);
			return res.send(data);
		});
	} else {
		req.send('Not remove id empty !');
	}
};
