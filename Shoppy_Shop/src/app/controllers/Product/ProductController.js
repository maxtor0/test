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
            include: [{model: Models.product_image, as: "images"}]
        });
        // TODO PRODUCT PAGE.
        res.render("home", {"layout": "template", products: products});
    },
    // get data of certian product
    get: async (req, res) => {
        let reviewApplicable= false;
        const product = await Product.findOne({
            where: {slug: req.params.slug, is_available: true},
            include: [{model: Models.product_image, as: "images"}, {model: Models.product_review, as: "reviews"}],
            order: [
                [{model:Models.product_review, as: "reviews"}, 'id', "DESC"]
            ]
        });
        if(req.session.user){
            const cart = await Models.cart.findOne({
                where: {
                    product_id: product.id,
                    customer_id: req.session.user.id,
                    is_checkout: true,
                    review: false
                }
            });
            if(cart) reviewApplicable = true;

        }
        if (product)
            return res.render("orders/itemsOrder", {"layout": "template", product: product, reviewApplicable:reviewApplicable});
        return res.status(404).send("Page not found");
    },
}
