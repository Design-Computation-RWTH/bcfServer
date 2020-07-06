const mongoose = require('mongoose');
const uuid = require("uuid")
const jwt = require("jsonwebtoken")

exports.topics_get_all =  (req, res, next) => {

    const id = req.params.projectId;

    const conn = mongoose.createConnection('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/'+ id + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });

    Topics = conn.model("Topics", require("../Models/topics"));
    module.exports = conn;

    Topics.find()
    .exec()
    .then(docs => {
        res.status(200).json(docs.map(doc => {
            return {
              guid: doc.guid,
              creation_author: doc.creation_author,
              topic_type: doc.topic_type,
              topic_status: doc.topic_status,
              title: doc.title,
              priority: doc.priority,
              labels: doc.labels,
              assigned_to: doc.assigned_to,
                }
            })
        )
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

};

exports.topic_get =  (req, res, next) => {
    
    const id = req.params.projectId;

    const conn = mongoose.createConnection('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/'+ id + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });

    Topics = conn.model("Topics", require("../Models/topics"));
    module.exports = conn;

    Topics.findOne({guid: req.params.topicId})
    .exec()
    .then(doc => {
        const response = {
            project_id: doc.project_id,
            name: doc.name,
            authorization: [
                "update"
                ]
            }
        // console.log(uuid.v4())
        res.status(200).json(doc);
        })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    };

exports.topic_create = (req, res, next) => {

    const id = req.params.projectId;

    const conn = mongoose.createConnection('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/'+ id + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });

    // TODO: Include Timezone

    const timestamp = new Date(Date.now()).toISOString();

    Topics = conn.model("Topics", require("../Models/topics"));
    module.exports = conn;

    const topic = new Topics({
        _id: new mongoose.Types.ObjectId(),
        guid: uuid.v4(),
        creation_date: timestamp,
        creation_author: jwt.decode(req.headers.authorization.split(" ")[1]).id,
        modified_author: jwt.decode(req.headers.authorization.split(" ")[1]).id,
        title: req.body.title,
        topic_type: req.body.topic_type,
        topic_status: req.body.topic_status,
        priority: req.body.priority,
        labels: req.body.labels,
        assigned_to: req.body.assigned_to,
        stage: req.body.stage
    });

    topic
        .save()
        .then(result => {
        console.log(result);
        res.status(201).json({
            _id: result._id,
            guid: result.guid,
            creation_date: result.creation_date,
            creation_author: result.creation_author,
            topic_type: result.topic_type,
            topic_status: result.topic_status,
            title: result.title,
            priority: result.priority,
            labels: result.labels,
            assigned_to: result.assigned_to,
            stage: result.stage
            });
        })
        .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
        });
    };

exports.topic_update = (req, res, next) => {

    const id = req.params.projectId;

    const conn = mongoose.createConnection('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/'+ id + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });

    Topics = conn.model("Topics", require("../Models/topics"));
    module.exports = conn;

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    };

    Topics.update({guid: req.params.topicId}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Updated"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};