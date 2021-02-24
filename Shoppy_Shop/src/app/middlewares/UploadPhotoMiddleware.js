"use strict";

const multer  = require('multer');
const fs = require("fs");
const path = require('path');

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const dir = path.join(path.dirname(require.main.filename), "src", "public", "media_root", "images", req.session.user.username, "profile");
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
