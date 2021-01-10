const validation = require('../validates/Validation')
const {logger} = require('../start/Logger')
const login = async function (req, res, next) {
    try {
        if (req.body.username && req.body.password) {
            await validation.authSchema.validateAsync(req.body);
            logger.info(`Login with ${req.body.username}`)
            return next();
        } else {
            logger.error(`Validation login`)
            return res.status(422).send({
                "code": "E_VALIDATION",
                "message": "Login failed",
                "description": "Validation of the Login form failed"
            });
        }
    } catch (error) {
        logger.error(`Validation login`)
        return res.status(422).send({
            "code": "E_VALIDATION",
            "message": "Login failed",
            "description": "Validation of the login form failed"
        });
    }
}
const register = async function (req, res, next) {
    try {
        if (req.body.username && req.body.password && req.body.email && req.body.phone) {
            await validation.registerSchema.validateAsync(req.body);
            logger.info(`register username : ${req.body.username}`)
            return next();
        } else {
            logger.error(`Validation register`)
            return res.status(422).send({
                "code": "E_VALIDATION",
                "message": "Register failed",
                "description": "Validation of the registration form failed"
            });
        }
    } catch (error) {
        logger.error(`Validation register`)
        return res.status(422).send({
            "code": "E_VALIDATION",
            "message": "Login failed",
            "description": "Validation of the login form failed"
        });
    }
}
const addProduct = async function (req, res, next) {
    try {
        if (req.body.id_seller && req.body.price && req.body.description && req.body.count_product) {
            await validation.productSchema.validateAsync(req.body);
            logger.info(`Add product by : ${req.body.id_seller}`)
            return next();
        } else {
            logger.error(`Validation addProduct`)
            return res.status(422).send({
                "code": "E_VALIDATION",
                "message": "Add product failed",
                "description": "Validation of the add product form failed"
            });
        }
    } catch (error) {
        logger.error(`Validation addProduct`)
        return res.status(422).send({
            "code": "E_VALIDATION",
            "message": "Add product failed",
            "description": "Validation of the add product form failed"
        });
    }
}
const addOrder = async function (req, res, next) {
    try {
        if (req.body.id_user && req.body.Orders_details[0]['id_product'] && req.body.Orders_details[0]['count_product']) {
            await validation.orderSchema.validateAsync(req.body);
            return next();
        } else {
            logger.error(`Validation addOrder`)
            return res.status(422).send({
                "code": "E_VALIDATION",
                "message": "Add orders failed",
                "description": "Validation of the add orders form failed"
            });
        }
    } catch (error) {
        logger.error(`Validation addOrder`)
        return res.status(422).send({
            "code": "E_VALIDATION",
            "message": "Add orders failed",
            "description": "Validation of the add orders form failed"
        });
    }
}

const changePassword = async function (req, res, next) {
    try {
        if (req.body.id && req.body.password && req.body.newPassword) {
            await validation.changePasswordSchema.validateAsync(req.body);
            logger.info(`changePassword product by id: ${req.body.id}`)
            return next();
        } else {
            logger.error(`Validation changePassword`)
            return res.status(422).send({
                "code": "E_VALIDATION",
                "message": "Change password failed",
                "description": "Validation of the Change password form failed"
            });
        }
    } catch (error) {
        logger.error(`Validation changePassword`)
        return res.status(422).send({
            "code": "E_VALIDATION",
            "message": "Change password failed",
            "description": "Validation of the Change password form failed"
        });
    }
}
const forgetPassword = async function (req, res, next) {
    try {
        if (req.body.id && req.body.newPassword) {
            await validation.forgetPasswordSchema.validateAsync(req.body);
            logger.info(`forgetPassword product by id: ${req.body.id}`)
            return next();
        } else {
            logger.error(`Validation forgetPassword`)
            return res.status(422).send({
                "code": "E_VALIDATION",
                "message": "Forget password failed",
                "description": "Validation of the Forget password form failed"
            });
        }
    } catch (error) {
        logger.error(`Validation forgetPassword`)
        return res.status(422).send({
            "code": "E_VALIDATION",
            "message": "Forget password failed",
            "description": "Validation of the Forget password form failed"
        });
    }
}
const updateInfo = async function (req, res, next) {
    try {
        if (req.body.id) {
            await validation.updateInfoSchema.validateAsync(req.body);
            return next();
        } else {
            logger.error(`Validation updateInfo`)
            return res.status(422).send({
                "code": "E_VALIDATION",
                "message": "Update information failed",
                "description": "Validation of the Update information form failed"
            });
        }
    } catch (error) {
        logger.error(`Validation updateInfo`)
        return res.status(422).send({
            "code": "E_VALIDATION",
            "message": "Update information failed",
            "description": "Validation of the Update information form failed"
        });
    }
}
const deleteIdUser = async function (req, res, next) {
    try {
        if (req.body.id) {
            await validation.deleteIdUserSchema.validateAsync(req.body);
            logger.info(`deleteIdUser id: ${req.body.id}`)
            return next();
        } else {
            logger.error(`Validation deleteIdUser`)
            return res.status(422).send({
                "code": "E_VALIDATION",
                "message": "Delete User failed",
                "description": "Validation of the Delete User form failed"
            });
        }
    } catch (error) {
        logger.error(`Validation deleteIdUser`)
        return res.status(422).send({
            "code": "E_VALIDATION",
            "message": "Delete User failed",
            "description": "Validation of the Delete User form failed"
        });
    }
}
const deleteUsername = async function (req, res, next) {
    try {
        if (req.body.username) {
            await validation.deleteUsernameSchema.validateAsync(req.body);
            logger.info(`deleteUsername username: ${req.body.username}`)
            return next();
        } else {
            logger.error(`Validation deleteUsername`)
            return res.status(422).send({
                "code": "E_VALIDATION",
                "message": "Delete User by username failed",
                "description": "Validation of the Delete User by username form failed"
            });
        }
    } catch (error) {
        logger.error(`Validation deleteUsername`)
        return res.status(422).send({
            "code": "E_VALIDATION",
            "message": "Delete User by username failed",
            "description": "Validation of the Delete User by username form failed"
        });
    }
}
const updateProduct = async function (req, res, next) {
    try {
        if (req.body.id && req.body.id_seller) {
            await validation.updateProductSchema.validateAsync(req.body);
            return next();
        } else {
            logger.error(`Validation updateProduct`)
            return res.status(422).send({
                "code": "E_VALIDATION",
                "message": "Update Product failed",
                "description": "Validation of the Update Product form failed"
            });
        }
    } catch (error) {
        logger.error(`Validation updateProduct`)
        return res.status(422).send({
            "code": "E_VALIDATION",
            "message": "Update Product failed",
            "description": "Validation of the Update Product form failed"
        });
    }
}
const deleteProduct = async function (req, res, next) {
    try {
        if (req.body.id && req.body.id_seller) {
            await validation.updateProductSchema.validateAsync(req.body);
            return next();
        } else {
            logger.error(`Validation deleteProduct`)
            return res.status(422).send({
                "code": "E_VALIDATION",
                "message": "Delete Product failed",
                "description": "Validation of the Delete Product form failed"
            });
        }
    } catch (error) {
        logger.error(`Validation deleteProduct`)
        return res.status(422).send({
            "code": "E_VALIDATION",
            "message": "Delete Product failed",
            "description": "Validation of the Delete Product form failed"
        });
    }
}
const editOrder = async function (req, res, next) {
    try {
        if (!req.body.id || !req.body.id_product || !req.body.count_product) {
            logger.error(`Validation editOrder`)
            return res.status(422).send({
                "code": "E_VALIDATION",
                "message": "Edit Order failed",
                "description": "Validation of the Edit Order form failed"
            });
        }
        await validation.editOrderSchema.validateAsync(req.body);
        return next();
    } catch (error) {
        logger.error(`Validation editOrder`)
        return res.status(422).send({
            "code": "E_VALIDATION",
            "message": "Edit Order failed",
            "description": "Validation of the Edit Order form failed"
        });
    }
}
const deleteOrder = async function (req, res, next) {
    try {
        if (!req.body.id_order || !req.body.id_user) {
            logger.error(`Validation deleteOrder`)
            return res.status(422).send({
                "code": "E_VALIDATION",
                "message": "Delete Order failed",
                "description": "Validation of the Delete Order form failed"
            });
        }
        await validation.deleteOrderSchema.validateAsync(req.body);
        return next();
    } catch (error) {
        logger.error(`Validation deleteOrder`)
        return res.status(422).send({
            "code": "E_VALIDATION",
            "message": "Delete Order failed",
            "description": "Validation of the Delete Order form failed"
        });
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
    deleteProduct,
    editOrder,
    deleteOrder
}