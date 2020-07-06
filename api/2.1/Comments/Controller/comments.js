const mongoose = require('mongoose');
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

exports.comments_get =  (req, res, next) => {

    const id = req.params.projectId;
    const topicId = req.params.topicId;

    const conn = mongoose.createConnection('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/'+ id + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });

    Comments = conn.model("Comments", require("../Models/comments"));
    module.exports = conn;


    Comments.find({topic_guid: topicId})
    .select("guid date author comment topic_guid -_id")
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

};

exports.comment_get =  (req, res, next) => {

    const id = req.params.projectId;
    const commentId = req.params.commentId;

    const conn = mongoose.createConnection('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/'+ id + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });

    Comments = conn.model("Comments", require("../Models/comments"));
    module.exports = conn;


    Comments.findOne({guid: commentId})
    .select("guid date author comment topic_guid -_id")
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

};

exports.comment_create = (req, res, next) => {

    const id = req.params.projectId;
    const topicId = req.params.topicId

    const conn = mongoose.createConnection('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/'+ id + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });

    // TODO: Include Timezone

    const timestamp = new Date(Date.now()).toISOString();

    Comments = conn.model("Comments", require("../Models/comments"));
    module.exports = conn;

    const comment = new Comments({
        _id: new mongoose.Types.ObjectId(),
        guid: uuid.v4(),
        date: timestamp,
        author: jwt.decode(req.headers.authorization.split(" ")[1]).id,
        comment: req.body.comment,
        reply_to_comment_guid: req.body.reply_to_comment_guid,
        viewpoint_guid: req.body.viewpoint_guid,
        topic_guid: topicId
    });

    comment
        .save()
        .then(result => {
        console.log(result);
        res.status(201).json({
            guid: result.guid,
            date: result.creation,
            author: result.author,
            comment: result.comment,
            reply_to_comment_guid: result.reply_to_comment_guid,
            viewpoint_guid: result.viewpoint_guid,
            topic_guid: result.topic_guid
            });
        })
        .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.comment_update = (req, res, next) => {

    const id = req.params.projectId;
    const topicId = req.params.topicId;
    const commentId = req.params.commentId
    const timestamp = new Date(Date.now()).toISOString();

    const conn = mongoose.createConnection('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/'+ id + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });

    Comments = conn.model("Comments", require("../Models/comments"));
    module.exports = conn;

    var data = req.body

    data["modified_author"] = jwt.decode(req.headers.authorization.split(" ")[1]).id
    data["modified_date"] = timestamp
    
    Comments.findOneAndUpdate({guid: commentId}, {$set: req.body}, {new: true })
        .select("guid date author comment topic_guid modified_author modified_date viewpoint_guid -_id")
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};