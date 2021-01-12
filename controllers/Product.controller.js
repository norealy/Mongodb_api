const Admin = require('../models/Admin.model');
const Product = require('../models/Product.model');
const Users = require('../models/Users.model');

const listProducts = async (req, res) => {
	try {
		let arrayProduct = await Product.find().select('-id_seller');
		return res.status(200).send(arrayProduct);
	} catch (error) {
		return res.status(404).send("Not found !");
	}
};

const productID = async (req, res) => {
	try {
		let pproduct = await Product.findById(req.params.id);
		if(!pproduct) return res.status(404).send("Not found !");
		const seller = await Users.findOne({_id:pproduct.id_seller}).select('-password');
		let copy = Object.assign({}, pproduct._doc);
		delete copy.id_seller;
		copy.fullname = seller.fullname;
		return res.status(200).send(copy);
	} catch (error) {
		return res.status(404).send("Not found !");
	}
};
const productByCategories = async (req, res) => {
	try {
		let data = await Product.find({ 'Categories.name': req.body.category_name }).select('-id_seller');
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
		product.id_seller = req.uid;
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
		await Product.findOne({ _id: req.body.id ,id_seller:req.uid}, async function (err, data) {
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
		const data = await Product.findOneAndUpdate({ _id: product.id, id_seller:req.uid }
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
		return res.status(401).send("ChangeInfo product fail !")
	}
};

const deleteByID = async (req, res) => {
	try {
		const productDel = await Product.findOne({ _id: req.body.id, id_seller: req.uid });
		if (!productDel) {
			const admin = await Admin.findById(req.uid);
			if (!admin) {
				return res.status(401).send("Delete product fail !")
			}
			await Product.deleteOne({ _id: req.body.id });
			return res.status(200).send(`Deleted product id :${req.body.id}`)
		}
		await Product.deleteOne({ _id: req.body.id, id_seller: req.uid });
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