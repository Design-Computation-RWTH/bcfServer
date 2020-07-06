const express = require('express');
const router = express.Router();
const checkAuth = require("../../Authentication/Middleware/check-auth");
const checkBindings = require("../../Topics/Middleware/checkBinding")

const ProjectController = require("../Controller/projects")
const TopicsController = require("../../Topics/Controller/topics");
const CommentsController = require("../../Comments/Controller/comments");
const ViewpointsController = require("../../Viewpoints/Controller/viewpoints");

//const { post } = require('../Models/extensions');

router.get("/", ProjectController.projects_get_all);

router.get("/:projectId", ProjectController.project_get);

router.get("/:projectId/extensions", ProjectController.project_extensions);

router.get("/:projectId/topics", TopicsController.topics_get_all);

router.get("/:projectId/topics/:topicId", TopicsController.topic_get);

router.get("/:projectId/topics/:topicId/comments", CommentsController.comments_get);

router.get("/:projectId/topics/:topicId/comments/:commentId", CommentsController.comment_get);

router.put("/:projectId", ProjectController.project_update);

router.put("/:projectId/topics/:topicId", checkBindings, TopicsController.topic_update);

router.put("/:projectId/topics/:topicId/comments/:commentId", CommentsController.comment_update);

router.post("/:projectId/topics", checkBindings, TopicsController.topic_create);

router.post("/:projectId/topics/:topicId/comments", CommentsController.comment_create);

router.post("/:projectId/topics/:topicId/viewpoints", ViewpointsController.viewpoint_create);




module.exports = router;