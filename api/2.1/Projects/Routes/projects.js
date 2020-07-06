const express = require('express');
const router = express.Router();
const checkAuth = require("../../Authentication/Middleware/check-auth");
const checkBindings = require("../../Topics/Middleware/checkBinding")

const ProjectController = require("../Controller/projects.js")
const TopicsController = require("../../Topics/Controller/topics");

//const { post } = require('../Models/extensions');

router.get("/", ProjectController.projects_get_all);

router.get("/:projectId", ProjectController.project_get);

router.get("/:projectId/extensions", ProjectController.project_extensions);

router.get("/:projectId/topics", TopicsController.topics_get_all);

router.get("/:projectId/topics/:topicId", TopicsController.topic_get);

router.put("/:projectId", ProjectController.project_update);

router.put("/:projectId/topics/:topicId", checkBindings, TopicsController.topic_update);

router.post("/:projectId/topics", checkBindings, TopicsController.topic_create);



module.exports = router;