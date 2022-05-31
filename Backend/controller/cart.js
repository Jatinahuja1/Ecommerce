var express = require("express");
var router = express.Router();
const userModel = require("../model/userModel");
const product = require("../model/productModel");
const itemModel = require("../model/cartModel");
var bodyParser = require("body-parser");
const { findOne } = require("../model/userModel");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});
var upload = multer({ storage });

module.exports = {
  addProduct: (req, res) => {
    console.log("req.params", req.body);
    let url = req.protocol + "://" + req.get("host");
    console.log(req.file.filename);
    new product({
      name: req.body.name,
      price: req.body.price,
      fileName: url + "/uploads/" + req.file.filename,
      vendorId: req.params.vendorId,
    }).save((err, docs) => {
      if (!err) {
        console.log("docs", docs);
        res.send(docs);
      } else {
        res.send("error in adding Products=>" + err);
      }
    });
  },

  addItemToCart: async (req, res) => {
    console.log("addItem", req.body);
    try {
      let additem = await itemModel({
        email_id: req.body.email_id,
        productId: req.body.productId,
        img: req.body.fileName,
        productName: req.body.name,
        // color: req.body.color,
        price: req.body.price,
      });
      console.log("addite123", additem);
      await additem.save();
      return res.status(201).send(additem);
    } catch (error) {
      console.error("error", error);
      return res.status(500).json({
        error: true,
        message: "Product not added",
      });
    }
  },

  getCartItems: async (req, res) => {
    console.log("test cart List", req.body);
    try {
      let cartItems = await itemModel.find({ email_id: req.body.email_id });
      console.log(cartItems);
      return res.status(201).send(cartItems);
    } catch (error) {
      console.error("error", error);
      return res.status(500).json({
        error: true,
        message: "Error in getting items",
      });
    }
  },

  deleteCartItems: async (req, res) => {
    console.log("test cart List", req.body);
    try {
      let cartItems = await itemModel.findOneAndRemove({ _id: req.body._id });
      console.log(cartItems);
      return res.status(201).send(cartItems);
    } catch (error) {
      console.error("error", error);
      return res.status(500).json({
        error: true,
        message: "Error in getting items",
      });
    }
  },

  //     payment :(req,res)=>{

  //     stripe.customers.create({
  //         email: req.body.stripeEmail,
  //         source: req.body.stripeToken,
  //         name: 'Gourav Hammad',
  //         address: {
  //             line1: 'TC 9/4 Old MES colony',
  //             postal_code: '452331',
  //             city: 'Indore',
  //             state: 'Madhya Pradesh',
  //             country: 'India',
  //         }
  //     })
  //     .then((customer) => {

  //         return stripe.charges.create({
  //             amount: 2500,     // Charing Rs 25
  //             description: 'Web Development Product',
  //             currency: 'INR',
  //             customer: customer.id
  //         });
  //     })
  //     .then((charge) => {
  //         res.send("Success")  // If no error occurs
  //     })
  //     .catch((err) => {
  //         res.send(err)       // If some error occurs
  //     });
  // })
};
