const express = require("express");
const router = express.Router();
const checkAuth = require("../../Authentication/Middleware/check-auth");
const checkBindings = require("../../Topics/Middleware/checkBinding");
const checkAdmin = require("../../Authentication/Middleware/check_admin");

const ProjectController = require("../Controller/projects");
const TopicsController = require("../../Topics/Controller/topics");
const CommentsController = require("../../Comments/Controller/comments");
const ViewpointsController = require("../../Viewpoints/Controller/viewpoints");
const DocumentsController = require("../../Documents/Controller/documents");

//const { post } = require('../Models/extensions');

router.get("/", ProjectController.projects_get_all);

router.get("/:projectId", ProjectController.project_get);

router.get("/:projectId/extensions", ProjectController.project_extensions);

router.get("/:projectId/topics", TopicsController.topics_get_all);

router.get("/:projectId/topics/:topicId", TopicsController.topic_get);

router.get(
  "/:projectId/topics/:topicId/document_references",
  TopicsController.documentreferences_get
);

router.get(
  "/:projectId/topics/:topicId/viewpoints",
  ViewpointsController.viewpoints_get
);

router.get(
  "/:projectId/topics/:topicId/viewpoints/:viewpointId",
  ViewpointsController.viewpoint_get
);

router.get(
  "/:projectId/topics/:topicId/viewpoints/:viewpointId/snapshot",
  ViewpointsController.viewpoint_get_snapshot
);

router.get(
  "/:projectId/topics/:topicId/viewpoints/:viewpointId/selection",
  ViewpointsController.viewpoint_get_selection
);

router.get(
  "/:projectId/topics/:topicId/viewpoints/:viewpointId/coloring",
  ViewpointsController.viewpoint_get_coloring
);

router.get(
  "/:projectId/topics/:topicId/viewpoints/:viewpointId/visibility",
  ViewpointsController.viewpoint_get_visibility
);

router.get(
  "/:projectId/topics/:topicId/viewpoints/:viewpointId/bitmaps/:bitmapId",
  ViewpointsController.viewpoint_get_bitmap
);

router.get(
  "/:projectId/topics/:topicId/comments",
  CommentsController.comments_get
);

router.get(
  "/:projectId/topics/:topicId/comments/:commentId",
  CommentsController.comment_get
);

router.get("/:projectId/documents", DocumentsController.documents_get);

router.get(
  "/:projectId/documents/:documentId",
  DocumentsController.document_get
);

router.get(
  "/:projectId/documents/:documentId/spatial_representation",
  DocumentsController.spatial_representation_get
);

router.put("/:projectId", ProjectController.project_update);

router.put(
  "/:projectId/extensions",
  checkAdmin,
  ProjectController.project_extensions_update
);

router.put(
  "/:projectId/topics/:topicId",
  checkBindings,
  TopicsController.topic_update
);

router.put(
  "/:projectId/topics/:topicId/comments/:commentId",
  CommentsController.comment_update
);

router.put(
  "/:projectId/documents/:documentId/spatial_representation",
  DocumentsController.spatial_representation_update
);

router.post("/", checkAdmin, ProjectController.project_create);

router.post(
  "/:projectId/extensions",
  checkAdmin,
  ProjectController.project_extensions_create
);

router.post("/:projectId/topics", checkBindings, TopicsController.topic_create);

router.post(
  "/:projectId/topics/:topicId/document_references",
  TopicsController.documentreferences_post
);

router.post(
  "/:projectId/topics/:topicId/comments",
  CommentsController.comment_create
);

router.post(
  "/:projectId/topics/:topicId/viewpoints",
  ViewpointsController.viewpoint_create
);

router.post("/:projectId/documents", DocumentsController.documents_post);

// BCF Extensions

router.get("/:projectId/viewpoints", ViewpointsController.viewpoints_get_all);

router.get("/:projectId/comments", CommentsController.comments_get_all);

router.get(
  "/:projectId/document_references",
  TopicsController.documentreferences_get_all
);

router.put(
  "/:projectId/viewpoints/:viewpointId",
  ViewpointsController.viewpoint_update
);

module.exports = router;
