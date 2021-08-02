const express = require("express");
const router = express.Router();
const checkAuth = require("./bcf/Authentication/Middleware/check-auth");
const checkBindings = require("./bcf/Topics/Middleware/checkBinding");
const checkAdmin = require("./bcf/Authentication/Middleware/check_admin");

const ProjectController = require("./bcf/Projects/Controller/projects");
const TopicsController = require("./bcf/Topics/Controller/topics");
const CommentsController = require("./bcf/Comments/Controller/comments");
const ViewpointsController = require("./bcf/Viewpoints/Controller/viewpoints");
const DocumentsController = require("./bcf/Documents/Controller/documents");
const VersionController = require("./public/Controller/versions");
const AuthController = require("./bcf/Authentication/Controller/auth.js");
const UserController = require("./bcf/User/Controller/user.js");

//const { post } = require('../Models/extensions');

// version routes

router.get("/versions", VersionController.get_versions);

// auth routes

router.get("/:bcfVersion/auth", AuthController.auth_get);

router.post("/:bcfVersion/auth/login", AuthController.auth_login);

router.get("/:bcfVersion/auth/signup", checkAdmin, AuthController.auth_signup);

// User routes

router.get(
  "/:bcfVersion/current-user/",
  checkAuth,
  UserController.current_user
);

// Project routes

router.get(
  "/:bcfVersion/projects/",
  checkAuth,
  ProjectController.projects_get_all
);

router.get(
  "/:bcfVersion/projects/:projectId",
  checkAuth,
  ProjectController.project_get
);

router.get(
  "/:bcfVersion/projects/:projectId/extensions",
  checkAuth,
  ProjectController.project_extensions
);

// Topics

router.get(
  "/:bcfVersion/projects/:projectId/topics",
  checkAuth,
  TopicsController.topics_get_all
);

router.get(
  "/:bcfVersion/projects/:projectId/topics/:topicId",
  checkAuth,
  TopicsController.topic_get
);

router.get(
  "/:bcfVersion/projects/:projectId/topics/:topicId/document_references",
  checkAuth,
  TopicsController.documentreferences_get
);

router.get(
  "/:bcfVersion/projects/:projectId/topics/:topicId/viewpoints",
  checkAuth,
  ViewpointsController.viewpoints_get
);

router.get(
  "/:bcfVersion/projects/:projectId/topics/:topicId/viewpoints/:viewpointId",
  checkAuth,
  ViewpointsController.viewpoint_get
);

router.get(
  "/:bcfVersion/projects/:projectId/topics/:topicId/viewpoints/:viewpointId/snapshot",
  checkAuth,
  ViewpointsController.viewpoint_get_snapshot
);

router.get(
  "/:bcfVersion/projects/:projectId/topics/:topicId/viewpoints/:viewpointId/selection",
  checkAuth,
  ViewpointsController.viewpoint_get_selection
);

router.get(
  "/:bcfVersion/projects/:projectId/topics/:topicId/viewpoints/:viewpointId/coloring",
  checkAuth,
  ViewpointsController.viewpoint_get_coloring
);

router.get(
  "/:bcfVersion/projects/:projectId/topics/:topicId/viewpoints/:viewpointId/visibility",
  checkAuth,
  ViewpointsController.viewpoint_get_visibility
);

router.get(
  "/:bcfVersion/projects/:projectId/topics/:topicId/viewpoints/:viewpointId/bitmaps/:bitmapId",
  checkAuth,
  ViewpointsController.viewpoint_get_bitmap
);

router.get(
  "/:bcfVersion/projects/:projectId/topics/:topicId/comments",
  checkAuth,
  CommentsController.comments_get
);

router.get(
  "/:bcfVersion/projects/:projectId/topics/:topicId/comments/:commentId",
  checkAuth,
  CommentsController.comment_get
);

router.get(
  "/:bcfVersion/projects/:projectId/documents",
  checkAuth,
  DocumentsController.documents_get
);

router.get(
  "/:bcfVersion/projects/:projectId/documents/:documentId",
  checkAuth,
  DocumentsController.document_get
);

router.get(
  "/:bcfVersion/projects/:projectId/documents/:documentId/spatial_representation",
  checkAuth,
  DocumentsController.spatial_representation_get
);

router.put(
  "/:bcfVersion/projects/:projectId",
  checkAuth,
  ProjectController.project_update
);

router.put(
  "/:bcfVersion/projects/:projectId/topics/:topicId",
  checkAuth,
  checkBindings,
  TopicsController.topic_update
);

router.put(
  "/:bcfVersion/projects/:projectId/topics/:topicId/comments/:commentId",
  checkAuth,
  CommentsController.comment_update
);

router.put(
  "/:bcfVersion/projects/:projectId/documents/:documentId/spatial_representation",
  checkAuth,
  DocumentsController.spatial_representation_update
);

router.post(
  "/:bcfVersion/projects/",
  checkAuth,
  checkAdmin,
  ProjectController.project_create
);

router.post(
  "/:bcfVersion/projects/:projectId/extensions",
  checkAuth,
  checkAdmin,
  ProjectController.project_extensions_create
);

router.post(
  "/:bcfVersion/projects/:projectId/topics",
  checkAuth,
  checkBindings,
  TopicsController.topic_create
);

router.post(
  "/:bcfVersion/projects/:projectId/topics/:topicId/document_references",
  checkAuth,
  TopicsController.documentreferences_post
);

router.post(
  "/:bcfVersion/projects/:projectId/topics/:topicId/comments",
  checkAuth,
  CommentsController.comment_create
);

router.post(
  "/:bcfVersion/projects/:projectId/topics/:topicId/viewpoints",
  checkAuth,
  ViewpointsController.viewpoint_create
);

router.post(
  "/:bcfVersion/projects/:projectId/documents",
  checkAuth,
  DocumentsController.documents_post
);

// BCF Extensions

router.get(
  "/:bcfVersion/projects/:projectId/viewpoints",
  checkAuth,
  ViewpointsController.viewpoints_get_all
);

router.get(
  "/:bcfVersion/projects/:projectId/comments",
  checkAuth,
  CommentsController.comments_get_all
);

router.get(
  "/:bcfVersion/projects/:projectId/document_references",
  checkAuth,
  TopicsController.documentreferences_get_all
);

router.put(
  "/:bcfVersion/projects/:projectId/viewpoints/:viewpointId",
  checkAuth,
  ViewpointsController.viewpoint_update
);

module.exports = router;
