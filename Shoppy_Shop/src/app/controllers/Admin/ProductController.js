'use strict';

const Models = require("../../../models");
const Product = Models.product
const Validator = require("../../../Helpers/ValidateRequestData")
const ValidateInstanceSave = require("../../../Helpers/ValidateModelSave")
const fs = require("fs");
const path = require("path");

module.exports = {
    getAddPage: async (req, res) => {
        res.render("admin/add", {"layout": "template/admin"});
    },

    getUpdatePage: async (req, res) => {
        const product = await Product.findOne({where: {slug: req.params.slug, is_available: true}});
        if (product)
            return res.render("admin/edit", {"layout": "template/admin", product: product});
        return res.status(404).send("Page not found");
    },
    addProduct: async (req, res) => {
        const required = ["name", "price", "stock", "is_available", "description"];
        const {isValid, data} = Validator.validateExistance(req, required);
        let isExist = false;
        console.log(data)
        if (isValid) {
            const product = Product.build({
                name: data.name || "DEFAULT NAME",
                slug: req.product ? req.product.slug : Product.slugify(data.name),
                owner_id: req.session.user.id,
                price: data.price || 100,
                is_available: data.is_available || true,
                description: data.description,
                stock: data.stock
            });
            isExist = await Product.findOne({where: {slug: product.slug}});
            const {item, errors} = await ValidateInstanceSave.validateSave(product, Product);
            // TODO
            if (item) {
                const product_images = [];
                if (req.body.photos) {
                    const root_dir = path.join(path.dirname(require.main.filename), "src", "public", "media_root", "product-images");
                    if (!fs.existsSync(root_dir)) fs.mkdirSync(root_dir);
                    req.product = {slug: req.product && req.product.slug ? req.product.slug : Product.slugify(req.body.name)};
                    const dir = path.join(root_dir, req.product.slug)
                    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
                    const uniqueSuffix = Date.now() + "" + Math.round(Math.random() * 1E9) + ".jpg";
                    const base64Data = req.body.photos.replace(/^data:image\/png;base64,/, "");
                    fs.writeFileSync(path.join(dir, uniqueSuffix), base64Data, 'base64', function (err) {
                        console.log(err);
                    });
                    product_images.push({
                        product_id: item.id,
                        is_main: !product_images.length ? 1 : 0,
                        image: `${process.env.MEDIA_URL}product-images/${req.product.slug}/${uniqueSuffix}`
                    });
                } else if (req.files && Array.isArray(req.files) && req.files.length) {
                    req.files.forEach(image => {
                        product_images.push({
                            product_id: item.id,
                            is_main: !product_images.length ? 1 : 0,
                            image: `${process.env.MEDIA_URL}product-images/${item.slug}/${image.filename}`
                        })
                    })
                }
                const imagesCreated = await Models.product_image.bulkCreate(product_images);
                if (!imagesCreated || !product_images.length) product.destroy();
                return res.redirect("/admin/addProduct");
            }
        }
        // console.log(req.body)
        // console.log(req.files)
        if (req.files && Array.isArray(req.files) && req.files.length && fs.existsSync(req.files[0].destination) && !isExist) fs.rmdirSync(req.files[0].destination, {recursive: true});

        return res.render("admin/add", {"layout": "template/admin", errors: "Data is not valid"});
    },
    updateProduct: async (req, res) => {
        const required = ["price", "stock", "is_available", "description"];
        const {isValid, data} = Validator.validateExistance(req, required);
        const product = await Product.findOne({where: {slug: req.params.slug}});
        if (isValid) {
            if (product) {
                product.price = data.price || 100;
                product.stock = data.stock || 1;
                product.is_available = data.is_available || true;
                product.description = data.description;
                const isSaved = await product.save();
                if (isSaved) {
                    return res.render("admin/edit", {"layout": "template/admin", product: product});
                }
            }
        }

        return res.render("admin/edit", {
            "layout": "template/template2",
            errors: "Invalid data provided",
            product: product
        });

    },
    deleteProduct: async (req, res) => {
        const product = await Product.findOne({where: {slug: req.params.slug}});
        if (product) {
            await product.destroy();
        }
        return res.redirect("/admin");
    }
    
}
