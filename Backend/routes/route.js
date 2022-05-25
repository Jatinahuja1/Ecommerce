var express = require("express");
var router = express.Router();
const userController = require("../controller/user");
var itemController = require("../controller/item");
const userModel = require("../model/model");
const { checkToken } = require("../middleware/auth");
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/forgot-password", userController.forgotPassword);

router.post("/forgot-password", userController.forgotPassword);

router.post("/add-item-to-cart", itemController.addItemToCart);

router.post("/get-cart-item", itemController.getCartItems);

module.exports = router;
