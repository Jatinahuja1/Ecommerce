var express = require("express");
var router = express.Router();
// const bcrypt = require("bcrypt");
const userModel = require('../model/model');
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

module.exports = {
  /**
   * userController.register()
   */

    register: async (req, res) => {
    // try {
    //   console.log("working2")
    //     const user = new userModel(req.body);
    //     console.log(user)
    //     let result = await user.save();
    //     console.log("result" , result)

    //     result = result.toObject();
    //     if (result) {
    //         delete result.password;
    //         res.send(req.body);
    //         console.log(result);
    //     } else {
    //         console.log("User already register");
    //     }
    // } catch (e) {
    //   console.log("working3",e)
    //   console.log("working3")
    //     res.send("Something Went Wrong");
    // }
    // async signup(req, res) {
      try {
        console.log("working2")
        // let user = await userModel.findOne({
        //   username: req.body.username,
        // });
  
        // if (user) {
        //   return res.status(400).json({
        //     error: true,
        //     message: "Username is already in use",
        //   });
        // }
  
       const user = new userModel(req.body);
       console.log(user)
        await user.save();
  
        return res.status(201).send(user);
      } catch (error) {
        console.error("error",error);
        return res.status(500).json({
          error: true,
          message: "Cannot Sign up",
        });
      }
    }
  // }
// },
}