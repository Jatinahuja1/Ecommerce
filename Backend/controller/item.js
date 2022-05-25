var express = require("express");
var router = express.Router();
const userModel = require("../model/model");
const itemModel = require("../model/itemModel");
var bodyParser = require("body-parser");
const { findOne } = require("../model/model");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

module.exports = {
  addItemToCart: async (req, res) => {
    console.log("addItem", req.body);
    try {

    //   let userDetails = await userModel.findOne({
    //     email_id: req.body.email_id,
    //   });
    //   console.log("userDetails", userDetails);
    //   console.log("userDetails-id", userDetails._id);

    //   let priceDetails = await itemModel.findOne({
    //     item_id: req.body.item_id,
    //   });

      let additem = await itemModel({
          email_id: req.body.email_id,
        // _id: userDetails._id,
        productId: req.body.productId,
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
    try{
        let cartItems = await itemModel.find({email_id:req.body.email_id});
        console.log(cartItems)
        return res.status(201).send(cartItems);
    }catch(error){
        console.error("error", error);
        return res.status(500).json({
          error: true,
          message: "Error in getting items",
        });
    }
  },
};
