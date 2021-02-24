'use strict';

const Models = require("../../../models");
const Review = Models.product_review
const Cart = Models.cart
const Product = Models.product
const Validator = require("../../../Helpers/ValidateRequestData")
const ValidateInstanceSave = require("../../../Helpers/ValidateModelSave")

module.exports = {
    post: async (req, res) => {
        const required = ["product_id", "rate", "comment"];
        const {isValid, data} = Validator.validateExistance(req, required);
        if (isValid) {
            data.rate = Number.parseFloat(data.rate);
            const cart = await Cart.findOne({
                where: {
                    product_id: data.product_id,
                    customer_id: req.session.user.id,
                    is_checkout: true,
                    review: false
                }
            });
            if (cart) {
                const review = await Review.build({
                    product_id: cart.product_id,
                    customer_id: req.session.user.id,
                    rate: data.rate<=5 && data.rate >=0?data.rate:0 || 0,
                    comment: data.comment || ""
                });
                const {item, errors} = await ValidateInstanceSave.validateSave(review, Review);
                if(item){
                    const reviewsCount = (await Review.findAll({where: {product_id: item.product_id}})).length;
                    const product = await Product.findOne({where: {id: item.product_id}});
                    product.rate = ((product.rate* reviewsCount) + item.rate) / (reviewsCount+1);
                    await product.save();
                    cart.review = true;
                    await cart.save();
                    return res.redirect(req.url);
                }
            }
        }
        // TODO Failed
        return res.redirect(req.url);
    }
}
