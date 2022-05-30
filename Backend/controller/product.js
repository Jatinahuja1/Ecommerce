var express = require("express");
var router = express.Router();
const product = require("../model/productModel");
var bodyParser = require("body-parser");
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
      vendorId:req.body.vendorId,
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
      console.log("getProduct",req.body)
      try{
        let cartItems = await product.find({ _id: req.body._id });
        console.log(cartItems);
        return res.status(201).send(cartItems);
      }catch(e){
        res.status(400).send({
            success: false,
            message: "Something went wrong",
          });
      }
  }
}