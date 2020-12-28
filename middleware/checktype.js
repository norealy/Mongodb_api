const {authSchema,registerSchema,productSchema,orderSchema} = require('../validates/Validation')
const _ = require('lodash');
exports.login = async function(req,res,next){
    try {
        if (req.body.username && req.body.password) {
            const result = await authSchema.validateAsync(req.body);
            console.log(result)
            return next();
        }else{
            res.send(`Email or password empty !!! `);
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
            const result = await registerSchema.validateAsync(req.body);
            console.log(result)
            return next();
        }else{
            res.send(`NOt empty !!! `);
            return;
        }
    } catch (error) {
        res.send(`Validation :${error.details[0]['message']}`);
        return;
    }
}

exports.validationProduct = async function(req,res,next){
    try {
        if (req.body.id_seller && req.body.price && req.body.description && req.body.count_product ) {
            // const bodyProduct = _.omit(req.body,['Categories'])
            const result = await productSchema.validateAsync(req.body);
            console.log(result)
            return next();
        }else{
            res.send(`NOt empty !!! `);
            return;
        }
    } catch (error) {
        res.send(`Validation :${error.details[0]['message']}`);
        return;
    }
}

exports.validationOrder = async function(req,res,next){
    try {
        console.log(req.body)
        if (req.body.id_user && req.body.Orders_details[0]['id_product'] && req.body.Orders_details[0]['count_product']) {
            const result = await orderSchema.validateAsync(req.body);
            console.log(result)
            return next();
        }else{
            res.send(`NOt empty !!! `);
            return;
        }
    } catch (error) {
        res.send(`Validation :${error.details[0]['message']}`);
        return;
    }
}
