const mongoose = require("mongoose");

const versionSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  schema: "http://json-schema.org/draft-03/schema#",
  title: "versions_GET",
  description: "Schema for Versions",
  type: "object",
  properties: {
    versions: {
      required: true,
      type: "array",
      items: {
        type: ["object", "null"],
        properties: {
          version_id: {
            type: "string",
            required: true,
          },
          detailed_version: {
            type: "string",
            required: false,
          },
        },
      },
    },
  },
});

module.exports = mongoose.model("versions_GET", userSchema);
