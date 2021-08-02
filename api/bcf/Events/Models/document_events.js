const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventActionSchema = new Schema(
  {
    type: {
      required: true,
      type: string,
    },
    value: {
      type: [string, null],
    },
  },
  { _id: false }
);

const documentEventSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  topic_guid: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  author: {
    type: string,
    required: true,
  },
  actions: [eventActionSchema],
});

module.exports = documentEventSchema;
