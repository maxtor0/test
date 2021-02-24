const express = require('express');
const route = express.Router();
const jsonBodyParser = require("body-parser").json();
const userController = require("../app/controllers/controller");

// TODO API routes Written down there as follows

route.get("/", jsonBodyParser, userController.homepage);

module.exports = route;
