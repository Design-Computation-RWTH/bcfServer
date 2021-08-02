const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guid: {
    type: String,
    required: true,
  },
  server_assigned_id: {
    type: String,
    required: false,
  },
  topic_type: {
    type: String,
    required: false,
  },
  topic_status: {
    type: String,
    required: false,
  },
  reference_links: {
    type: Array,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  priority: {
    type: String,
    required: false,
  },
  index: {
    type: Number,
    required: false,
  },
  labels: {
    type: Array,
    required: false,
  },
  creation_date: {
    type: String,
    required: true,
  },
  creation_author: {
    type: String,
    required: false,
  },
  modified_date: {
    type: Date,
    required: false,
  },
  modified_author: {
    type: String,
    required: false,
  },
  assigned_to: {
    type: String,
    required: false,
  },
  stage: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  due_date: {
    type: String,
    required: false,
  },
});

// module.exports = mongoose.model('Extensions', extensionsSchema);
module.exports = topicsSchema;
