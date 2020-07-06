const express = require('express');
const router = express.Router();

const AuthController = require("../Controller/auth.js")

router.get("/", AuthController.auth_get);

module.exports = router;