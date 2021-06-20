const Projects = require("../Models/projects");
const uuid = require("uuid");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const Extensions = require('../models/extensions');

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
  // check if Connection is already defined
  if (cache == undefined) {
    cache = setConnection(id);
    return cache;
  } else {
    // check if we are connected to the right server, if not change connection
    if (cache.name == id) {
      return cache;
    } else {
      cache = setConnection(id);
      return cache;
    }
  }
}

exports.projects_get_all = (req, res, next) => {
  Projects.find({
    user: jwt.decode(req.headers.authorization.split(" ")[1]).id,
  })
    .select("project_id name")
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
      /*res.status(200).json({
                Body: docs.map( doc => { 
                    return {
                        _id: doc._id,
                        project_id: doc.project_id,
                        name: doc.name,
                        requests: {
                            type: 'GET',
                            url: 'http://localhost.3000/orders/' + docs._id
                        }
                    };
                })
            });*/
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

//TODO: Get "Authorization" from the server/user

exports.project_get = (req, res, next) => {
  Projects.findOne({ project_id: req.params.projectId })
    .select("project_id name")
    .exec()
    .then((doc) => {
      const response = {
        project_id: doc.project_id,
        name: doc.name,
        authorization: ["update"],
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.project_update = (req, res) => {
  const id = req.params.projectId;
  Projects.findOneAndUpdate(
    { project_id: id },
    { $set: { name: req.body["name"] } },
    { new: true, runValidators: true },
    (err, doc) => {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else if (doc === null) {
        res.status(404).json({ message: "Project was not found" });
      } else {
        console.log(doc);
        res.status(200).json({
          projectId: doc.project_id,
          name: doc.name,
          authorization: ["update"],
        });
      }
    }
  );
};

exports.project_create = (req, res) => {
  // Projects = conn.model("Projects", require("../Models/projects"));
  // module.exports = conn;

  const project = new Projects({
    _id: new mongoose.Types.ObjectId(),
    project_id: uuid.v4(),
    name: req.body.name,
  });

  project
    .save()
    .then((result) => {
      res.status(201).json({
        project_id: result.project_id,
        name: result.name,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.project_extensions_create = (req, res) => {
  const id = req.params.projectId;

  const conn = checkCache(id);

  Extensions = conn.model("Extensions", require("../Models/extensions"));
  console.log(Extensions);
  module.exports = conn;

  const extension = new Extensions({
    _id: new mongoose.Types.ObjectId(),
    topic_type: req.body.topic_type,
    topic_status: req.body.topic_status,
    topic_label: req.body.topic_label,
    priority: req.body.priority,
    user_id_type: req.body.user_id_type,
    stage: req.body.stage,
    project_actions: req.body.project_actions,
    topic_actions: req.body.topic_actions,
    comment_actions: req.body.topic_actions,
  });

  extension
    .save()
    .then((result) => {
      res.status(201).json({
        topic_type: result.topic_type,
        topic_status: result.topic_status,
        priority: result.priority,
        user_id_type: result.user_id_type,
        stage: result.stage,
        project_actions: result.project_actions,
        topic_actions: result.topic_actions,
        comment_actions: result.topic_actions,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
/*
exports.project_extensions = (req, res) => {
    const id = req.params.projectId;
    mongoose.createConnection('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/' + id + '?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology:true
    });
    console.log(mongoose.connections)
    Extensions.find()
    .exec()
    .then(docs => {
        res.status(200).json({message: docs});
    })
    .catch(err => {
        res.status(500).json({
            error: err
    });
});
} */

exports.project_extensions = (req, res) => {
  const id = req.params.projectId;

  const conn = checkCache(id);

  Extensions = conn.model("Extensions", require("../Models/extensions"));
  module.exports = conn;

  // only one extensions object should be available per project so we can just take the first index of the array

  Extensions.find()
    .exec()
    .then((docs) => {
      res.status(200).json({
        topic_type: docs[0].topic_type,
        topic_status: docs[0].topic_status,
        topic_label: docs[0].topic_label,
        snippet_type: docs[0].snippet_type,
        priority: docs[0].priority,
        user_id_type: docs[0].user_id_type,
        stage: docs[0].stage,
        project_actions: docs[0].project_actions,
        topic_actions: docs[0].topic_actions,
        comment_actions: docs[0].comment_actions,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
