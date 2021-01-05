const Product = require('../models/Product.model');
const listProducts = async (req, res) => {
	let arrayProduct = await Product.find();
	return res.send(arrayProduct);
};

const productID = async (req, res) => {
	if (req.params.id) {
		let pproduct = await Product.findById(req.params.id);
		return res.send(pproduct);
	} else {
		return res.send('Not found !');
	}
};
const productByCategories = async (req, res) => {
	if (req.body.category_name) {
		try {
			let newProduct = await Product.find({'Categories.name':req.body.category_name});
			return res.send(newProduct);
		} catch (error) {
			return res.send(error);
		}
	} else {
		return res.send('Not found !');
	}
};
const productShowSeller = async (req, res) => {
	if (req.body.id_seller) {
		const pproduct = await Product.find({id_seller: req.body.id_seller});
		return res.status(200).send(pproduct);
	} else {
		return res.status(401).send('Not found !');
	}
};
const addProduct = async (req, res) => {
	if (req.body) {
		let product = req.body;
		let newProduct = new Product(product);
		await newProduct.save(function (err, data) {
			if (err) return console.error(err);
			res.send(data);
		});
	}
};
const updateCount = async (req, res) => {
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

const changeInfo = async (req, res) => {
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

const deleteByID = async (req, res) => {
	if (req.body.id) {
		await Product.remove({ _id: req.body.id }, function (err, data) {
			if (err) return console.error(err);
			return res.send(data);
		});
	} else {
		return res.send('Not remove id empty !');
	}
};

module.exports = {
	listProducts,
	productID,
	productByCategories,
	productShowSeller,
	addProduct,
	updateCount,
	changeInfo,
	deleteByID
}