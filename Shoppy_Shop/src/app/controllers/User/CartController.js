'use strict';

const {Op} = require("sequelize");
const Models = require("../../../models");
const validator = require("../../../Helpers/ValidateRequestData");
const Product = Models.product;

module.exports = {
    // Get all User carts
    getCheckedout: async (req, res) => {
        const userCart = await Models.cart.findAll({
            where: {customer_id: req.session.user.id, is_checkout: true},
            include: [
                {model: Models.product, as: "product", include:[
                    {model: Models.product_image, as: "images"}
                ]}
            ]
        });
        res.render("profile/userOrders", {"layout": "template",carts: userCart});
    },
    get: async (req, res) => {
        const userCart = await Models.cart.findAll({
            where: {customer_id: req.session.user.id, is_checkout: false},
            include: [
                {model: Models.product, as: "product", include:[
                    {model: Models.product_image, as: "images"}
                ]}
            ]
        });
        res.render("orders/cartPage", {"layout": "template",carts: userCart});
    },
    // Post to cart
    post: async (req, res) => {
        const data = {quantity:1};
        const user = await Models.User.findOne({
            where: {id: req.session.user.id},
            include: [{model: Models.role, as: "role"}]
        });
        if (user.role.role !== "admin") {
            let product = await Product.findOne({where: {slug: req.params.slug, is_available:true , stock: {[Op.gte]: data.quantity}}});
            if (product) {
                const cart = await Models.cart.create({
                    product_id: product.id,
                    customer_id: user.id,
                    quantity: data.quantity
                });
                if (cart) {
                    product.stock -= data.quantity;
                    product.is_available = product.is_available? data.quantity>0: false;
                    await product.save();
                    // return res.render("orders/cartPage", {"layout": "template", message: "Product added to stock successfully!"});
                }
            }
        }
        return res.redirect("/mycart");
        // return res.render("orders/cartPage", {"layout": "template", message: "Failed to add product to stock!"});
    }
}
