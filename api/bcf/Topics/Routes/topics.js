const express = require("express");
const router = express.Router();
const checkAuth = require("../../Authentication/Middleware/check-auth");

const TopicsController = require("../Controller/topics.js");

router.get("/", TopicsController.topics_get_all);

module.exports = router;
