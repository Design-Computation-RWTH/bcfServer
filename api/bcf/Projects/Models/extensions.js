const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const extensionsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  topic_type: {
    type: Array,
    required: false,
  },
  topic_status: {
    type: Array,
    required: false,
  },
  topic_label: {
    type: Array,
    required: false,
  },
  snippet_type: {
    type: Array,
    required: false,
  },
  priority: {
    type: Array,
    required: false,
  },
  user_id_type: {
    type: Array,
    required: false,
  },
  stage: {
    type: Array,
    required: false,
  },
  project_actions: {
    type: Array,
    required: false,
  },
  topic_actions: {
    type: Array,
    required: false,
  },
  comment_actions: {
    type: Array,
    required: false,
  },
});

// module.exports = mongoose.model('Extensions', extensionsSchema);
module.exports = extensionsSchema;
