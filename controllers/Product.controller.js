const Admin = require('../models/Admin.model');
const Product = require('../models/Product.model');

const listProducts = async (req, res) => {
	try {
		let arrayProduct = await Product.find();
		return res.status(200).send(arrayProduct);
	} catch (error) {
		return res.status(404).send("Not found !");
	}
};

const productID = async (req, res) => {
	if (req.params.id) {
		try {
			let pproduct = await Product.findById(req.params.id);
			return res.status(200).send(pproduct);
		} catch (error) {
			return res.status(404).send("Not found !");
		}
	} else {
		return res.status(404).send("Not found !");
	}
};
const productByCategories = async (req, res) => {
	try {
		let data = await Product.find({ 'Categories.name': req.body.category_name });
		if (!data) return res.status(404).send("Not found !");
		return res.status(200).send(data);
	} catch (error) {
		return res.status(404).send("Not found !");
	}
};
const productShowSeller = async (req, res) => {
	if (req.body.id_seller) {
		try {
			let pproduct = await Product.find({ id_seller: req.body.id_seller });
			return res.status(200).send(pproduct);
		} catch (error) {
			return res.status(404).send("Not found !");
		}
	} else {
		return res.status(404).send("Not found !");
	}
};

const addProduct = async (req, res) => {
	try {
		let product = req.body;
		let newProduct = new Product(product);
		const data = await newProduct.save();
		if (!data) return res.status(401).send("Save Fail !");
		return res.status(200).send(newProduct);
	} catch (error) {
		return res.status(401).send("Save Fail !");
	}
};

const updateCount = async (req, res) => {
	if (req.body.id) {
		let product = req.body;
		await Product.find({ _id: req.body.id }, async function (err, data) {
			await Product.findOneAndUpdate(
				{ _id: product.id },
				{
					"count_product": data.count_product - product.count_selled
				},
				{ new: true },
				function (err, data) {
					if (err) return res.status(401).send("Update Fail !");
					return res.status(200).send(data);
				}
			);
		});
	} else {
		return res.status(401).send("Update Fail !");
	}
};

const changeInfo = async (req, res) => {
	try {
		let product = req.body;
		const data = await Product.findOneAndUpdate({ _id: product.id, id_seller: product.id_seller }
			, {
				"image": product.image,
				"price": product.price,
				"description": product.description,
				"count_product": product.count_product,
				"Categories.name": product.Categories.name
			}
			, { new: true })
		if (!data) {
			return res.status(401).send("ChangeInfo product fail !")
		}
		return res.status(200).send("ChangeInfo product Successfully !")
	} catch (error) {
		console.log(error)
		return res.status(401).send("ChangeInfo product fail !")
	}
};

const deleteByID = async (req, res) => {
	try {
		const productDel = await Product.findOne({ _id: req.body.id, id_seller: req.body.id_seller });
		if (!productDel) {
			const admin = await Admin.findById(req.body.id_seller);
			if (!admin) {
				return res.status(401).send("Delete product fail !")
			}
			await Product.deleteOne({ _id: req.body.id });
			return res.status(200).send(`Deleted product id :${req.body.id}`)
		}
		await Product.deleteOne({ _id: req.body.id, id_seller: req.body.id_seller });
		return res.status(200).send(`Deleted product id :${req.body.id}`)
	} catch (error) {
		return res.status(401).send("Delete product fail !")
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