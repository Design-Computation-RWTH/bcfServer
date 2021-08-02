const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vectorSchema = new Schema(
  {
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
    z: {
      type: Number,
    },
  },
  { _id: false }
);

const spatialRepresentationSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  documentId: {
    type: String,
    required: true,
  },
  alignment: {
    type: String,
    required: false,
  },

  location: vectorSchema,

  rotation: vectorSchema,

  scale: vectorSchema,
});

module.exports = spatialRepresentationSchema;
