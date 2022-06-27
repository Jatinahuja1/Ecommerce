const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();
var TOKEN_SECRET = "mysecret123";

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      jwt.verify(token, "mysecret123", (err, decoded) => {
        if (err) {
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
  },
};
