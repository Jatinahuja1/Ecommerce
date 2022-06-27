var express = require("express");
var router = express.Router();
const userModel = require("../model/userModel");
const product = require("../model/productModel");
const cartModel = require("../model/cartModel");
const orderModel = require("../model/order");
var bodyParser = require("body-parser");
const { findOne } = require("../model/userModel");
const Cart = require("../model/cartPayment");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const dotenv = require('dotenv');
dotenv.config();
const Stripe = require("stripe")(process.env.SECRET_KEY);
const YOUR_DOMAIN = "http://localhost:3000";

module.exports = {
  addItemToCart: async (req, res) => {
    try {
      let additem = await cartModel({
        email_id: req.body.email_id,
        productId: req.body.productId,
        fileName: req.body.fileName,
        name: req.body.name,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
      });
      await additem.save();
      return res.status(201).send(additem);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Product not added",
      });
    }
  },

  getCartItems: async (req, res) => {
    try {
      let cartItems = await cartModel.find({ email_id: req.body.email_id });
      return res.status(201).send(cartItems);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Error in getting items",
      });
    }
  },

  deleteCartItems: async (req, res) => {
    try {
      let cartItems = await cartModel.findOneAndRemove({ _id: req.body._id });
      return res.status(201).send(cartItems);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Error in getting items",
      });
    }
  },

  payment: async (req, res) => {
    let stripeData = [];
    let currency = "usd";
    await cartModel
      .find({ email_id: req.body.email_id })
      .populate({ path: "productId" })
      .then((docs) => {
        console.log("docs",docs)
        stripeData = docs.map((item) => {
          return {
            price_data: {
              currency: currency,
              product_data: {
                images: [item.fileName],
                name: item.name,
              },
              unit_amount: Math.round(
                item.price * 100 * 0.8 + item.price * 100 * 0.8 * 0.12
              ),
            },
            quantity: "1",             
          };
        });
      });
      console.log("stripeData",stripeData)
    try {
      const session = await Stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        shipping_address_collection: {
          allowed_countries: ["US", "CA", "KE","IN"],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: "usd",
              },
              display_name: "Free shipping",
              // Delivers between 5-7 business days
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 5,
                },
                maximum: {
                  unit: "business_day",
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1500,
                currency: "usd",
              },
              display_name: "Next day air",
              // Delivers in exactly 1 business day
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 1,
                },
              },
            },
          },
        ],
        phone_number_collection: {
          enabled: true,
        },
        line_items: stripeData,
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cancel.html`,
      });
      res.json({ url: session.url });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },
};
