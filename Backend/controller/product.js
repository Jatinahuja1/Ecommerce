var express = require("express");
var router = express.Router();
const product = require("../model/productModel");
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

module.exports = {

addProduct: (req, res) => {
    console.log("req.params", req.body);
    let url = req.protocol + "://" + req.get("host");
    new product({
      name: req.body.name,
      price: req.body.price,
      vendorId:req.body.vendorId,
      color: req.body.color,
      size: req.body.size,
      fileName: url + "/uploads/" + req.file.filename,
    }).save((err, docs) => {
      if (!err) {
        console.log("docs", docs);
        res.send(docs);
      } else {
        res.send("error in adding Products=>" + err);
      }
    });
  },

  getProduct: async(req,res)=>{
      try{
        let cartItems = await product.find();

        console.log("cartItems",cartItems);
        return res.status(201).send(cartItems);
      }catch(e){
        console.log("e",e)
        res.status(400).send({
            success: false,
            message: "Something went wrong",
          });
      }
  }
}