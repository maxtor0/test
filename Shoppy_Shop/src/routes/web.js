const express = require('express');
const route = express.Router();
const ejs = require("ejs");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require("body-parser").urlencoded({extended: false});
const expressLayout = require("express-ejs-layouts");
const middlewares = require("../app/middlewares");

const cartController = require("../app/controllers/User/CartController");
const registerController = require("../app/controllers/Auth/RegisterController")
const loginController = require("../app/controllers/Auth/loginController")
const homepageController = require("../app/controllers/controller");
const ProfileController = require('../app/controllers/User/ProfileController');
const controller = require('../app/controllers/controller');
const ProductController = require('../app/controllers/Product/ProductController');
const ProductReviewController = require('../app/controllers/Product/ProductReviewsController');
const CartController = require('../app/controllers/User/CartController');
const AdminProductPage = require('../app/controllers/Admin/ProductController');
const AdminLoginController = require('../app/controllers/Auth/AdminLoginController');
const AdminHomepageController = require('../app/controllers/Admin/HomepageController');

route.use(cookieParser());
route.use(session({
    name:"SHOPPYSHOP_SESSID",
    secret: process.env.APP_KEY,
    resave: false,
    saveUninitialized: true
}));

route.use(expressLayout);
route.use(middlewares["SessionMiddleware"]);

// TODO Web routes Written down there as follows

route.get("/", bodyParser, homepageController.home);
route.get("/cart", middlewares["AuthMiddleware"],  bodyParser, cartController.get);



// route.get("/", bodyParser, homepageController.get);
route.get("/profile", middlewares["AuthMiddleware"], bodyParser, ProfileController.get);
route.get("/profile/orders", middlewares["AuthMiddleware"], bodyParser, CartController.getCheckedout);
route.post("/profile", middlewares["AuthMiddleware"], middlewares["UploadPhotoMiddleware"].single('profile_picture'), bodyParser, ProfileController.update);

// Admin Section
// Login
route.get("/admin/login", bodyParser, middlewares["GuestMiddleware"], AdminLoginController.get);
route.post("/admin/login", bodyParser, middlewares["GuestMiddleware"], AdminLoginController.post);

// Admin Dashboard
route.get("/admin", bodyParser, middlewares["AdminMiddleware"], AdminHomepageController.list);
route.get("/admin/orders", bodyParser, middlewares["AdminMiddleware"], homepageController.adminOrders);
route.get("/admin/addproduct", bodyParser, middlewares["AdminMiddleware"], AdminProductPage.getAddPage);
route.post("/admin/addproduct", bodyParser, middlewares["AdminMiddleware"], middlewares["UploadProductImagesMiddleware"].array("photos", 12), AdminProductPage.addProduct);
route.get("/admin/editproduct/:slug", bodyParser, middlewares["AdminMiddleware"], AdminProductPage.getUpdatePage);
route.post("/admin/editproduct/:slug", bodyParser, middlewares["AdminMiddleware"], AdminProductPage.updateProduct);
route.get("/admin/deleteproduct/:slug", bodyParser, middlewares["AdminMiddleware"], AdminProductPage.deleteProduct);

//=================

// route.get("/", bodyParser, middlewares["AuthMiddleware"], homepageController.get);

// route.post("/", bodyParser, homepageController.post);
route.get("/logout", bodyParser, loginController.logout);
route.get("/listProducts", bodyParser, homepageController.listProducts);

// route.get("/register", bodyParser, homepageController.register);
route.get("/register", middlewares["GuestMiddleware"], registerController.get);
route.post("/register", middlewares["GuestMiddleware"] ,bodyParser, registerController.post);

route.get("/login", middlewares["GuestMiddleware"], loginController.get);
route.post("/login", middlewares["GuestMiddleware"], bodyParser, loginController.post);

route.get("/items/:slug", bodyParser, ProductController.get);
route.post("/items/:slug", bodyParser, middlewares["AuthMiddleware"], ProductReviewController.post);
route.get("/items/add-to-cart/:slug", bodyParser, middlewares["AuthMiddleware"], cartController.post);
route.get("/mycart", middlewares["AuthMiddleware"], bodyParser, CartController.get);



// route.get("/profiles", bodyParser, profileController.list);
// route.post("/", bodyParser, homepageController.post);

module.exports = route;
