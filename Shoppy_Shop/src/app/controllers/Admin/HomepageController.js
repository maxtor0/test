'use strict';

const Models = require("../../../models");
const Product = Models.product
const Validator = require("../../../Helpers/ValidateRequestData")
const ValidateInstanceSave = require("../../../Helpers/ValidateModelSave")

module.exports = {
    // List all products
    list: async (req, res) => {
        const products = await Models.product.findAll({
            where: {is_available: true},
            include: [{model: Models.product_image, as: "images"}, {model: Models.User, as:"owner"}]
        });
        // TODO PRODUCT PAGE.
        res.render("admin", {"layout": "template/admin", products: products});
    },
}