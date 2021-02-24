"use strict";

const Product = require("../../models").product;
const multer  = require('multer');
const fs = require("fs");
const path = require('path');


const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const root_dir = path.join(path.dirname(require.main.filename), "src", "public", "media_root", "product-images");
        if (!fs.existsSync(root_dir)) fs.mkdirSync(root_dir);
        req.product = {slug: req.product && req.product.slug? req.product.slug:Product.slugify(req.body.name)};
        const dir = path.join(root_dir, req.product.slug)
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        cb(null, dir);

    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "" + Math.round(Math.random() * 1E9) + ".jpg";
        cb(null, uniqueSuffix)
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
