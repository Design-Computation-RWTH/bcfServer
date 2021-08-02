const mongoose = require("mongoose");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const parser = require("odata-parser");

var cache = undefined;

function setConnection(id) {
  connection = cache = mongoose.createConnection(
    process.env.MONGO_ATLAS_URL + id + "?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  return connection;
}

function checkCache(id) {
  // console.log(mongoose.connections);

  // check if Connection is already defined
  if (cache == undefined) {
    cache = setConnection(id);
    return cache;
  } else {
    // check if we are connected to the right server, if not change connection
    if (cache.name == id) {
      return cache;
    } else {
      var connections = mongoose.connections;
      for (connection in connections) {
        var connectionDict = connections[connection];
        if (connectionDict.name == id) {
          cache = connectionDict;
          console.log("switched to existing cache");
          return cache;
        }
      }
      cache = setConnection(id);
      return cache;
    }
  }
}

exports.topics_get_all = (req, res, next) => {
  const id = req.params.projectId;

  const conn = checkCache(id);
  Topics = conn.model("Topics", require("../Models/topics"));
  module.exports = conn;

  // console.log(req.query);

  // var myQuery = req.query.$filter;
  // var parsing = parser.parse("$filter=" + myQuery);
  // console.log(JSON.stringify(parsing));

  var selectString;

  if (req.params.bcfVersion == "2.1") {
    selectString = "-_id -__v -server_assigned_id";
  } else if (req.params.bcfVersion == "3.0") {
    selectString = "-_id -__v";
  }

  Topics.find()
    .select(selectString)
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.documentreferences_get = (req, res, next) => {
  const id = req.params.projectId;
  const topicId = req.params.topicId;

  const conn = checkCache(id);

  DocumentReference = conn.model(
    "DocumentReferences",
    require("../Models/documentreference")
  );
  module.exports = conn;

  DocumentReference.find({ topic_guid: topicId })
    .exec()
    .then((docs) => {
      res.status(200).json(
        docs.map((doc) => {
          return {
            guid: doc.guid,
            url: doc.url,
            document_guid: doc.document_guid,
            description: doc.description,
          };
        })
      );
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.topic_get = (req, res, next) => {
  const id = req.params.projectId;
  const topicId = req.params.topicId;

  const conn = checkCache(id);

  Topics = conn.model("Topics", require("../Models/topics"));
  module.exports = conn;

  var selectString;

  if (req.params.bcfVersion == "2.1") {
    selectString = "-_id -__v -server_assigned_id";
  } else if (req.params.bcfVersion == "3.0") {
    selectString = "-_id -__v";
  }

  Topics.findOne({ guid: topicId })
    .select(selectString)
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.topic_create = (req, res, next) => {
  const id = req.params.projectId;

  const conn = checkCache(id);

  // TODO: Include Timezone

  const timestamp = new Date(Date.now()).toISOString();

  Topics = conn.model("Topics", require("../Models/topics"));
  module.exports = conn;

  var newGuid;

  if (req.body.guid) {
    newGuid = req.body.guid;
  } else {
    newGuid = uuid.v4();
  }

  var selectString;

  if (req.params.bcfVersion == "2.1") {
    selectString = "-_id -__v -server_assigned_id";
  } else if (req.params.bcfVersion == "3.0") {
    selectString = "-_id -__v";
  }

  Topics.findOne({ guid: newGuid })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(500).json({
          error: "GUID already exists",
        });
        return;
      } else {
        var mongoId = mongoose.Types.ObjectId();

        const topic = new Topics({
          _id: mongoId,
          server_assigned_id: mongoId,
          guid: newGuid,
          creation_date: timestamp,
          creation_author: jwt.decode(req.headers.authorization.split(" ")[1])
            .id,
          title: req.body.title,
          topic_type: req.body.topic_type,
          topic_status: req.body.topic_status,
          priority: req.body.priority,
          labels: req.body.labels,
          assigned_to: req.body.assigned_to,
          stage: req.body.stage,
        });

        topic
          .save()
          .then((result) => {
            // console.log(result);
            if (req.params.bcfVersion == "2.1") {
              res.status(201).json({
                guid: result.guid,
                creation_date: result.creation_date,
                creation_author: result.creation_author,
                topic_type: result.topic_type,
                topic_status: result.topic_status,
                title: result.title,
                priority: result.priority,
                labels: result.labels,
                assigned_to: result.assigned_to,
                stage: result.stage,
              });
            } else if (req.params.bcfVersion == "3.0") {
              res.status(201).json({
                guid: result.guid,
                creation_date: result.creation_date,
                creation_author: result.creation_author,
                topic_type: result.topic_type,
                topic_status: result.topic_status,
                title: result.title,
                priority: result.priority,
                labels: result.labels,
                assigned_to: result.assigned_to,
                stage: result.stage,
              });
              res.status(201).json(result);
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
    });
};

exports.documentreferences_post = (req, res, next) => {
  const id = req.params.projectId;
  const topicId = req.params.topicId;

  const conn = checkCache(id);

  DocumentReference = conn.model(
    "DocumentReferences",
    require("../Models/documentreference")
  );
  module.exports = conn;
  console.log("References");

  const documentReference = new DocumentReference({
    _id: new mongoose.Types.ObjectId(),
    guid: uuid.v4(),
    url: req.body.url,
    document_guid: req.body.document_guid,
    //description: req.body.description,
    topic_guid: topicId,
  });

  documentReference
    .save()
    .then((result) => {
      res.status(201).json({
        guid: result.guid,
        url: result.url,
        document_guid: result.document_guid,
        //description: result.description
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.topic_update = (req, res, next) => {
  const id = req.params.projectId;
  const TopicId = req.params.topicId;
  const timestamp = new Date(Date.now()).toISOString();

  const conn = checkCache(id);

  Topics = conn.model("Topics", require("../Models/topics"));
  module.exports = conn;

  var data = req.body;

  data["modified_author"] = jwt.decode(
    req.headers.authorization.split(" ")[1]
  ).id;
  data["modified_date"] = timestamp;

  var selectString;

  if (req.params.bcfVersion == "2.1") {
    selectString = "-_id -__v -server_assigned_id";
  } else if (req.params.bcfVersion == "3.0") {
    selectString = "-_id -__v";
  }

  Topics.findOneAndUpdate({ guid: TopicId }, { $set: data }, { new: true })
    .select(selectString)
    .exec()
    .then((result) => {
      // res.status(200).json({
      //   guid: result.guid,
      //   creation_date: result.creation_date,
      //   creation_author: result.creation_author,
      //   modified_author: result.modified_author,
      //   modified_date: result.modified_date,
      //   topic_type: result.topic_type,
      //   topic_status: result.topic_status,
      //   title: result.title,
      //   priority: result.priority,
      //   labels: result.labels,
      //   assigned_to: result.assigned_to,
      //   stage: result.stage,
      // });
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// BCF Extension

exports.topics_get_all_with_documentId = (req, res, next) => {
  const id = req.params.projectId;

  const conn = checkCache(id);

  Topics = conn.model("Topics", require("../Models/topics"));
  module.exports = conn;

  Topics.find()
    .exec()
    .then((docs) => {
      res.status(200).json(
        docs.map((doc) => {
          return {
            guid: doc.guid,
            creation_date: doc.creation_date,
            creation_author: doc.creation_author,
            topic_type: doc.topic_type,
            topic_status: doc.topic_status,
            title: doc.title,
            priority: doc.priority,
            labels: doc.labels,
            assigned_to: doc.assigned_to,
          };
        })
      );
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.documentreferences_get_all = (req, res, next) => {
  const id = req.params.projectId;
  const topicId = req.params.topicId;

  const conn = checkCache(id);

  DocumentReference = conn.model(
    "DocumentReferences",
    require("../Models/documentreference")
  );
  module.exports = conn;

  DocumentReference.find({})
    .exec()
    .then((docs) => {
      res.status(200).json(
        docs.map((doc) => {
          return {
            guid: doc.guid,
            url: doc.url,
            document_guid: doc.document_guid,
            description: doc.description,
            topic_guid: doc.topic_guid,
          };
        })
      );
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
