const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();
var TOKEN_SECRET = "mysecret123";

module.exports = {
  checkToken: (req, res, next) => {
    console.log("req=>", req.body);
    let token = req.get("authorization");
    console.log("token AUth=>", token);
    if (token) {
      token = token.slice(7);
      console.log("token slice=>", token);
      console.log();
      jwt.verify(token, "mysecret123", (err, decoded) => {
        if (err) {
          console.log("err token=>", err);
          return res.json({
            status: 0,
            message: "Invalid Token...",
          });
        } else {
          if (decoded.result[0].email_id != req.body.email_id) {
            return res.json({
              status: 0,
              message: "Token invalid for current user",
            });
          } else {
            next();
          }
        }
      });
    } else {
      return res.json({
        status: 0,
        message: "Access Denied! Unauthorized User",
      });
    }
  }
};
