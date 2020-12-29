const validation = require('../validates/Validation')
const _ = require('lodash');
exports.login = async function(req,res,next){
    try {
        if (req.body.username && req.body.password) {
            const result = await validation.authSchema.validateAsync(req.body);
            console.log(result)
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
exports.register = async function(req,res,next){
    try {
        if (req.body.username && req.body.password && req.body.email && req.body.phone ) { //&& req.body.email && req.body.phone
            const result = await validation.registerSchema.validateAsync(req.body);
            console.log(result)
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
exports.addProduct = async function(req,res,next){
    try {
        if (req.body.id_seller && req.body.price && req.body.description && req.body.description ) {
            // const bodyProduct = _.omit(req.body,['Categories'])
            const result = await validation.productSchema.validateAsync(req.body);
            console.log(result)
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
exports.addOrder = async function(req,res,next){
    try {
        console.log(req.body)
        if (req.body.id_user && req.body.Orders_details[0]['id_product'] && req.body.Orders_details[0]['count_product']) {
            const result = await validation.orderSchema.validateAsync(req.body);
            console.log(result)
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

exports.ChangePassword = async function(req,res,next){
    try {
        console.log(req.body)
        if (req.body.id && req.body.password && req.body.newPassword) {
            const result = await validation.changePasswordSchema.validateAsync(req.body);
            console.log(result)
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
exports.ForgetPassword = async function(req,res,next){
    try {
        console.log(req.body)
        if (req.body.id && req.body.newPassword) {
            const result = await validation.forgetPasswordSchema.validateAsync(req.body);
            console.log(result)
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
exports.UpdateInfo = async function(req,res,next){
    try {
        console.log(req.body)
        if (req.body.id) {
            const result = await validation.updateInfoSchema.validateAsync(req.body);
            console.log(result)
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
exports.DeleteIdUser = async function(req,res,next){
    try {
        console.log(req.body)
        if (req.body.id) {
            const result = await validation.deleteIdUserSchema.validateAsync(req.body);
            console.log(result)
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
exports.DeleteUsername = async function(req,res,next){
    try {
        console.log(req.body)
        if (req.body.username) {
            const result = await validation.deleteUsernameSchema.validateAsync(req.body);
            console.log(result)
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
exports.UpdateProduct = async function(req,res,next){
    try {
        console.log(req.body)
        if (req.body.id && req.body.id_seller) {
            const result = await validation.updateProductSchema.validateAsync(req.body);
            console.log(result)
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

