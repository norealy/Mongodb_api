const validation = require('../validates/Validation')
const login = async function (req, res, next) {
    try {
        if (req.body.username && req.body.password) {
            await validation.authSchema.validateAsync(req.body);
            return next();
        } else {
            return res.status(400).send({
                "code": "E_VALIDATION",
                "message": "Login failed",
                "description": "Validation of the Login form failed"
            });
        }
    } catch (error) {
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
            return next();
        } else {
            return res.status(400).send({
                "code": "E_VALIDATION",
                "message": "Register failed",
                "description": "Validation of the registration form failed"
            });
        }
    } catch (error) {
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
            return next();
        } else {
            return res.status(400).send({
                "code": "E_VALIDATION",
                "message": "Add product failed",
                "description": "Validation of the add product form failed"
            });
        }
    } catch (error) {
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
            return res.status(400).send({
                "code": "E_VALIDATION",
                "message": "Add orders failed",
                "description": "Validation of the add orders form failed"
            });
        }
    } catch (error) {
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
            return next();
        } else {
            return res.status(400).send({
                "code": "E_VALIDATION",
                "message": "Change password failed",
                "description": "Validation of the Change password form failed"
            });
        }
    } catch (error) {
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
            return next();
        } else {
            return res.status(400).send({
                "code": "E_VALIDATION",
                "message": "Forget password failed",
                "description": "Validation of the Forget password form failed"
            });
        }
    } catch (error) {
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
            return res.status(400).send({
                "code": "E_VALIDATION",
                "message": "Update information failed",
                "description": "Validation of the Update information form failed"
            });
        }
    } catch (error) {
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
            return next();
        } else {
            return res.status(400).send({
                "code": "E_VALIDATION",
                "message": "Delete User failed",
                "description": "Validation of the Delete User form failed"
            });
        }
    } catch (error) {
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
            return next();
        } else {
            return res.status(400).send({
                "code": "E_VALIDATION",
                "message": "Delete User by username failed",
                "description": "Validation of the Delete User by username form failed"
            });
        }
    } catch (error) {
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
            return res.status(400).send({
                "code": "E_VALIDATION",
                "message": "Update Product failed",
                "description": "Validation of the Update Product form failed"
            });
        }
    } catch (error) {
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
            return res.status(400).send({
                "code": "E_VALIDATION",
                "message": "Delete Product failed",
                "description": "Validation of the Delete Product form failed"
            });
        }
    } catch (error) {
        return res.status(422).send({
            "code": "E_VALIDATION",
            "message": "Delete Product failed",
            "description": "Validation of the Delete Product form failed"
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
    deleteProduct
}