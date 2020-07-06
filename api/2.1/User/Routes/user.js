const express = require('express');
const router = express.Router();
const checkAuth = require("../../Authentication/Middleware/check-auth");
const mongoose = require("mongoose");


const UserController = require("../Controller/user.js")

router.get("/", UserController.current_user);

module.exports = router;