const Joi = require('@hapi/joi');
const  authSchema = Joi.object({
    username: Joi.string()
        .required()
        .pattern(/(?=^[a-zA-Z]+\d*$)(?!^\w{1}\d{1}$)(?=\w{3,})/i).message("Định dạng Username không bắt đầu bằng số và lớn hơn 3 ký tự"),
    password: Joi.string() 
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{4,})/).message("Định dạng password có chữ HOA chữ thường và số"),
});
const  registerSchema = Joi.object({
    username: Joi.string()
        .required()
        .pattern(/(?=^[a-zA-Z]+\d*$)(?!^\w{1}\d{1}$)(?=\w{3,})/i).message("Định dạng Username không bắt đầu bằng số và lớn hơn 3 ký tự"),
    password: Joi.string() 
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{4,})/).message("Định dạng password có chữ HOA chữ thường và số"),
    email: Joi.string().lowercase()
        .pattern(new RegExp('^[a-z0-9]+@(g|e)?mail\.com$')).message("Định dạng email có abc@email.com | abc@gmail.com"),
    phone: Joi.string()
        .pattern(/^[0]{1}\d{9,}$/).message("Định dạng phone number(0-9) có 10 số"),
});
const  changePasswordSchema = Joi.object({
    id: Joi.string()
        .required(),
    password: Joi.string() 
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{4,})/).message("Định dạng password có chữ HOA chữ thường và số").required(),
    newPassword: Joi.string() 
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{4,})/).message("Định dạng password có chữ HOA chữ thường và số").required(),
});
const  forgetPasswordSchema = Joi.object({
    id: Joi.string()
        .required(),
    newPassword: Joi.string() 
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{4,})/).message("Định dạng password có chữ HOA chữ thường và số"),
});
const  updateInfoSchema = Joi.object({
    id: Joi.string()
        .required(),
    fullname: Joi.string().pattern(/^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/i).message("Full name is string !!!"),
    avatar : Joi.string(),
    phone: Joi.string()
        .pattern(/^[0]{1}\d{9,}$/).message("Định dạng phone number(0-9) có 10 số"),
    address: Joi.string(),

});
const  deleteIdUserSchema = Joi.object({
    id: Joi.string()
        .required(),

});
const  deleteUsernameSchema = Joi.object({
    username: Joi.string()
        .required(),

});
const  updateProductSchema = Joi.object({
    id: Joi.string()
        .required(),
    id_seller: Joi.string()
        .required(),
    price: Joi.number().min(1000).message("Giá có định dạng number , phải lớn hơn 1000"),
    description: Joi.string(),
    count_product: Joi.number().min(1).message("Số lượng có định dạng number , phải lớn hơn 1"),
    Categories: Joi.object({
        name:Joi.string()
    }),
});

const  productSchema = Joi.object({
    id_seller: Joi.string()
        .required(),
    image: Joi.string()
        .required(),
    price: Joi.number().min(1000).message("Giá có định dạng number , phải lớn hơn 1000")
        .required(),
    description: Joi.string()
        .required(),
    count_product: Joi.number().min(1).message("Số lượng có định dạng number , phải lớn hơn 1")
        .required(),
    Categories: Joi.object({
        name:Joi.string()
        .required(),
    })
});
const Orders_detail = Joi.object({
    id_product : Joi.string()
        .required(),
    count_product: Joi.number()
            .min(1).message("Số lượng có định dạng number, lớn hơn bằng 1 ")
            .required()
})
const  orderSchema = Joi.object({
    id_user: Joi.string()
        .required(),
    Orders_details: Joi.array().items(Orders_detail)
});

module.exports = {
    authSchema,
    registerSchema,
    productSchema,
    orderSchema,
    changePasswordSchema,
    forgetPasswordSchema,
    updateInfoSchema,
    deleteIdUserSchema,
    deleteUsernameSchema,
    updateProductSchema
}
