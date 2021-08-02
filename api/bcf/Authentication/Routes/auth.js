const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const checkAdmin = require("../Middleware/check_admin");

const AuthController = require("../Controller/auth.js");

router.get("/", AuthController.auth_get);
router.post("/login", AuthController.auth_login);
router.post("/signup", checkAdmin, AuthController.auth_signup);

module.exports = router;
