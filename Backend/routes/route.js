var express = require("express");
var router = express.Router();
const userController = require("../controller/user");
var cartController = require("../controller/cart");
const productController = require("../controller/product");
const { checkToken } = require("../middleware/auth");
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const multer = require("multer");
  
var storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, new Date().getTime()+'-' + file.originalname)
    }
  });
  
var upload = multer({storage});

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/forgot-password", userController.forgotPassword);

router.post("/forgot-password", userController.forgotPassword);

router.post("/add-item-to-cart", cartController.addItemToCart);

router.post("/get-cart-item", cartController.getCartItems);

router.post("/delete-cart-item", cartController.deleteCartItems);

router.post('/', upload.single('image') ,productController.addProduct);

router.post('/getproduct',productController.getProduct);


// router.post("/payment", cartController.payment);

module.exports = router;
