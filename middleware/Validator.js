const validation = require('../validates/Validation')
const login = async function(req,res,next){
    try {
        if (req.body.username && req.body.password) {
            await validation.authSchema.validateAsync(req.body);
            return next();
        }else{
            return res.send(`username or password empty !!! `);
        }
    } catch (error) {
        return res.send(`Validation :${error.details[0]['message']}`);
    }
}
const register = async function(req,res,next){
    try {
        if (req.body.username && req.body.password && req.body.email && req.body.phone ) {
            await validation.registerSchema.validateAsync(req.body);
            return next();
        }else{
            return res.send(`Body must have username,password,email,phone !!! `);
        }
    } catch (error) {
        return res.send(`Validation :${error.details[0]['message']}`);
    }
}
const addProduct = async function(req,res,next){
    try {
        if (req.body.id_seller && req.body.price && req.body.description && req.body.description ) {
            await validation.productSchema.validateAsync(req.body);
            return next();
        }else{
            return res.send(`Body must have id_seller,price,description,description !!! `);
        }
    } catch (error) {
        return res.send(`Validation :${error.details[0]['message']}`);
    }
}
const addOrder = async function(req,res,next){
    try {
        if (req.body.id_user && req.body.Orders_details[0]['id_product'] && req.body.Orders_details[0]['count_product']) {
            await validation.orderSchema.validateAsync(req.body);
            return next();
        }else{
            return res.send(`Body must have id_user, Orders_details [{id_product,count_product}]  `);
        }
    } catch (error) {
        return res.send(`${error}`);
    }
}

const changePassword = async function(req,res,next){
    try {
        if (req.body.id && req.body.password && req.body.newPassword) {
            await validation.changePasswordSchema.validateAsync(req.body);
            return next();
        }else{
            return res.send(`Body must have id_user, password , newPassword `);
        }
    } catch (error) {
        return res.send(`${error}`);
    }
}
const forgetPassword = async function(req,res,next){
    try {
        if (req.body.id && req.body.newPassword) {
            await validation.forgetPasswordSchema.validateAsync(req.body);
            return next();
        }else{
            return res.send(`Body must have id_user, newPassword  `);
        }
    } catch (error) {
        return res.send(`${error}`);
    }
}
const updateInfo = async function(req,res,next){
    try {
        if (req.body.id) {
            await validation.updateInfoSchema.validateAsync(req.body);
            return next();
        }else{
            return res.send(`Body must have id_user, info  `);
        }
    } catch (error) {
        return res.send(`${error}`);
    }
}
const deleteIdUser = async function(req,res,next){
    try {
        if (req.body.id) {
            await validation.deleteIdUserSchema.validateAsync(req.body);
            return next();
        }else{
            return res.send(`Body must have id_user  `);
        }
    } catch (error) {
        return res.send(`${error}`);
    }
}
const deleteUsername = async function(req,res,next){
    try {
        if (req.body.username) {
            await validation.deleteUsernameSchema.validateAsync(req.body);
            return next();
        }else{
            return res.send(`Body must have username `);
        }
    } catch (error) {
        return res.send(`${error}`);
    }
}
const updateProduct = async function(req,res,next){
    try {
        if (req.body.id && req.body.id_seller) {
            // await validation.updateProductSchema.validateAsync(req.body);
            return next();
        }else{
            return res.send(`Body must have id_seller ,id product  `);
        }
    } catch (error) {
        return res.send(`${error}`);
    }
}
const deleteProduct = async function(req,res,next){
    try {
        if (req.body.id && req.body.id_seller) {
            await validation.updateProductSchema.validateAsync(req.body);
            return next();
        }else{
            return res.send(`Body must have id_seller ,id product  `);
        }
    } catch (error) {
        return res.send(`${error}`);
    }
}

module.exports = {
    login,
    register,
    addProduct,
    addOrder,
    changePassword,
    forgetPassword,
    updateInfo,
    deleteIdUser,
    deleteUsername,
    updateProduct,
    deleteProduct
}