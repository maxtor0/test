const Models = require("../../models");

// Homepage
module.exports = {
    home: async (req, res) => {
        const products = await Models.product.findAll({
            where: {is_available:true},
            limit: 6,
            order: [['createdAt', 'DESC']],
            include: [{model: Models.product_image, as: "images"}]
        });
        res.render("home", {"layout": "template", products: products});
    },
}
