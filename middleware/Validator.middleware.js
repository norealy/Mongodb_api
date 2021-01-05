const validation = require('../validates/Validation')
const login = async function(req,res,next){
    try {
        if (req.body.username && req.body.password) {
            await validation.authSchema.validateAsync(req.body);
            return next();
        }else{
            res.send(`username or password empty !!! `);
            return;
        }
    } catch (error) {
        res.send(`Validation :${error.details[0]['message']}`);
        return;
    }
}
const register = async function(req,res,next){
    try {
        if (req.body.username && req.body.password && req.body.email && req.body.phone ) {
            await validation.registerSchema.validateAsync(req.body);
            return next();
        }else{
            res.send(`Body must have username,password,email,phone !!! `);
            return;
        }
    } catch (error) {
        res.send(`Validation :${error.details[0]['message']}`);
        return;
    }
}
const addProduct = async function(req,res,next){
    try {
        if (req.body.id_seller && req.body.price && req.body.description && req.body.description ) {
            await validation.productSchema.validateAsync(req.body);
            return next();
        }else{
            res.send(`Body must have id_seller,price,description,description !!! `);
            return;
        }
    } catch (error) {
        res.send(`Validation :${error.details[0]['message']}`);
        return;
    }
}
const addOrder = async function(req,res,next){
    try {
        if (req.body.id_user && req.body.Orders_details[0]['id_product'] && req.body.Orders_details[0]['count_product']) {
            await validation.orderSchema.validateAsync(req.body);
            return next();
        }else{
            res.send(`Body must have id_user, Orders_details [{id_product,count_product}]  `);
            return;
        }
    } catch (error) {
        res.send(`${error}`);
        return;
    }
}

const changePassword = async function(req,res,next){
    try {
        if (req.body.id && req.body.password && req.body.newPassword) {
            await validation.changePasswordSchema.validateAsync(req.body);
            return next();
        }else{
            res.send(`Body must have id_user, password , newPassword `);
            return;
        }
    } catch (error) {
        res.send(`${error}`);
        return;
    }
}
const forgetPassword = async function(req,res,next){
    try {
        if (req.body.id && req.body.newPassword) {
            await validation.forgetPasswordSchema.validateAsync(req.body);
            return next();
        }else{
            res.send(`Body must have id_user, newPassword  `);
            return;
        }
    } catch (error) {
        res.send(`${error}`);
        return;
    }
}
const updateInfo = async function(req,res,next){
    try {
        if (req.body.id) {
            await validation.updateInfoSchema.validateAsync(req.body);
            return next();
        }else{
            res.send(`Body must have id_user, info  `);
            return;
        }
    } catch (error) {
        res.send(`${error}`);
        return;
    }
}
const deleteIdUser = async function(req,res,next){
    try {
        if (req.body.id) {
            await validation.deleteIdUserSchema.validateAsync(req.body);
            return next();
        }else{
            res.send(`Body must have id_user  `);
            return;
        }
    } catch (error) {
        res.send(`${error}`);
        return;
    }
}
const deleteUsername = async function(req,res,next){
    try {
        if (req.body.username) {
            await validation.deleteUsernameSchema.validateAsync(req.body);
            return next();
        }else{
            res.send(`Body must have username `);
            return;
        }
    } catch (error) {
        res.send(`${error}`);
        return;
    }
}
const updateProduct = async function(req,res,next){
    try {
        if (req.body.id && req.body.id_seller) {
            await validation.updateProductSchema.validateAsync(req.body);
            return next();
        }else{
            res.send(`Body must have id_seller ,...  `);
            return;
        }
    } catch (error) {
        res.send(`${error}`);
        return;
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
    updateProduct
}