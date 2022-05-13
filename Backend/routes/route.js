var express = require('express');
var router = express.Router();
const userController = require('../controller/user');
const userModel = require('../model/model');
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/register', userController.register);

router.post('/login', userController.login);

module.exports = router;