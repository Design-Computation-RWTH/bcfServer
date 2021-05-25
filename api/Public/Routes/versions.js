const express = require("express");
const router = express.Router();

const VersionController = require("../Controller/versions");

router.get("/", VersionController.get_versions);

module.exports = router;
