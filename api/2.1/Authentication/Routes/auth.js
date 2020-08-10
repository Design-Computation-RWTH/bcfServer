const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const checkRights = require("../Middleware/check-rights")

const AuthController = require("../Controller/auth.js")

router.get("/", AuthController.auth_get);
router.post("/login", AuthController.auth_login)
router.post("/signup",checkRights, AuthController.auth_signup)


module.exports = router;