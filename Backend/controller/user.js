var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const userModel = require("../model/model");
const { mailer } = require("../config/send-email");

var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { Compressor } = require("mongodb");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
require("dotenv").config();

const TOKEN_KEY = "gfg_jwt_secret_key";

module.exports = {
  /**
   * userController.register()
   */
  register: async (req, res) => {
    console.log(req.body);
    try {
      console.log("working2");
      let userCheck = await userModel.findOne({
        username: req.body.username,
      });
      console.log("userCheck", userCheck);
      let emailCheck = await userModel.findOne({
        email_id: req.body.email_id,
      });

      if (emailCheck) {
        return res.status(400).json({
          error: true,
          message: "Email already exist",
        });
      }

      if (userCheck) {
        return res.status(400).json({
          error: true,
          message: "username is already in use",
        });
      }
      const user = new userModel(req.body);
      console.log("user=>", user);
      const token = jwt.sign({ _id: user._id }, `${process.env.JWT_TOKEN}`, {
        expiresIn: "2h",
      });
      console.log("token", token);
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
    console.log("login", req.body);
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

  /**
   * userController.forgotPassword()
   */
  forgotPassword: async function (req, res) {
    console.log("req.body", req.body);
    let checkUser, mailData;
    try {
      checkUser = await userModel.findOne({
        email: req.body.email_id,
      });
    } catch (err) {
      console.log(err);
      return res.status(200).json({
        error: err,
        status: false,
        message: "Something went wrong",
      });
    }
    if (checkUser) {
      try {
        let verifyToken = generateRandomOtp(4);
        const updateUser = await userModel.findOneAndUpdate(
          { _id: checkUser.id },
          { otp: verifyToken },
          { new: true }
        );

        mailData = {
          to: checkUser.email,
          subject: "Forgot Password",
          template: "Forgot Password",
        };
        mailer.sendMail(mailData);
        return res.status(200).json({
          status: true,
          message: "A password has been sent to your mail",
        });
      } catch (err) {
        console.log(err);
        return res.status(200).json({
          error: err,
          status: false,
          message: "Something went wrong",
        });
      }
    } else {
      return res.status(200).json({
        status: false,
        message: "User not found",
      });
    }
    function generateRandomOtp(length = 4) {
      let OTP = "";
      let digits = "0123456789";
      for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    }
  },
};
