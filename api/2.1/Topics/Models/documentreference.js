const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentReferenceSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guid: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  document_guid: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  topic_guid: {
    type: String,
    required: true,
  },
});

// module.exports = mongoose.model('Extensions', extensionsSchema);
module.exports = documentReferenceSchema;
