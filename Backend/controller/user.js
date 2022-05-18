var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const userModel = require("../model/model");
var bodyParser = require("body-parser");
const dotenv = require('dotenv');
const { Compressor } = require("mongodb");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
require('dotenv').config();

const TOKEN_KEY = "gfg_jwt_secret_key";


module.exports = {

  /**
   * userController.register()
   */
  register: async (req, res) => {
    console.log(req.body)
    try {
      console.log("working2");
      let userCheck = await userModel.findOne({
        username: req.body.username,
      });

      let emailCheck = await userModel.findOne({
        email_id: req.body.email_id,
      });

      if (emailCheck) {
        return res.status(400).json({
          error: true,
          message: "Email is already in use",
        });
      }

      if (userCheck) {
        return res.status(400).json({
          error: true,
          message: "username is already in use",
        });
      }
      const user = new userModel(req.body);
console.log("user=>",user)

      
      // await user.save();
     

    const token = jwt.sign(
      { _id: user._id },
      `${process.env.JWT_TOKEN}`,
      {
        expiresIn: "2h",
      }
    );
    console.log("token",token);
    // save user token
    user.token = token;
    await user.save();
    console.log("user", user);
    console.log("Saved");
      return res.status(201).send(user);
    } catch (error) {
      console.error("error", error);
      return res.status(500).json({
        error: true,
        message: "Cannot Sign up",
      });
    }
  },

  /**
   * userController.login()
   * */
  login: async (req, res) => {
    try {
      let bodyData = req.body;
      let result = await userModel.findOne({ email_id: bodyData.email_id });

      if (result) {
        let validPassword = await bcrypt.compare(
          req.body.password,
          result.password
        );

        if (validPassword) {
          res.status(200).send({
            success: true,
            message: "Login successful!",
            data: result,
          });
        } else {
          res.status(200).send({
            success: false,
            message: "Password is incorrect",
          });
        }
      } else {
        res.status(200).send({
          success: false,
          message: "Email does not exist",
        });
      }
    } catch (err) {
      res.status(400).send({
        success: false,
        message: "Something went wrong",
      });
    }
  },
};
