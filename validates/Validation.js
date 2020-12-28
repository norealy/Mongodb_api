const Joi = require('@hapi/joi');


const  authSchema = Joi.object({
    username: Joi.string()
        .required()
        .pattern(/(?=^[a-zA-Z]+\d*$)(?!^\w{1}\d{1}$)(?=\w{2,})/i),
    password: Joi.string() 
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{4,})/),
});

const  registerSchema = Joi.object({
    username: Joi.string()
        .required()
        .pattern(/(?=^[a-zA-Z]+\d*$)(?!^\w{1}\d{1}$)(?=\w{2,})/i),
    password: Joi.string() 
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{4,})/),
    email: Joi.string()
        .required().lowercase()
        .pattern(new RegExp('^[a-z0-9]+@(g|e)?mail\.com$')),
    phone: Joi.string()
        .required()
        .pattern(/^[0]{1}\d{9,}$/)
});

const  productSchema = Joi.object({
    id_seller: Joi.string()
        .required(),
    image: Joi.string()
        .required(),
    price: Joi.number().min(1000)
        .required(),
    description: Joi.string()
        .required(),
    count_product: Joi.number().min(1)
        .required(),
    Categories: Joi.object({
        name:Joi.string()
        .required(),
    })
});

const  orderSchema = Joi.object({
    id_user: Joi.string()
        .required(),
    Orders_details: Joi.array()
});

module.exports = {
    authSchema,
    registerSchema,
    productSchema,
    orderSchema
}
