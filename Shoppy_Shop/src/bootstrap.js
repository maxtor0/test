const express = require('express');
const path = require('path');
const routes = require('./routes')
const model = require("./models")


module.exports = app => {

    // App public directories
    app.use(process.env.STATIC_URL, express.static(path.join(__dirname, "/public/static_root")));
    app.use(process.env.MEDIA_URL, express.static(path.join(__dirname, "/public/media_root")));

    // Template Engine and Views Directory
    app.set('views', path.join(__dirname, '/views'));
    app.set("view engine", "ejs");

    // Routes
    app.use("/api", routes.apiRouter);
    app.use("/", routes.webRouter);

    // Check Connection
    model.sequelize.authenticate()
        .then(() => console.log("Connected to database successfully!"))
        .catch(error => console.log(`Error: ${error}`));

};
