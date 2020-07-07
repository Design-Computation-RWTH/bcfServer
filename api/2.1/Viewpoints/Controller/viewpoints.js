const mongoose = require('mongoose');
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

exports.viewpoints_get =  async (req, res, next) => {

    const id = req.params.projectId;
    const topicId = req.params.topicId;

    const conn = mongoose.createConnection('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/'+ id + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });

    Viewpoints = conn.model("Viewpoints", require("../Models/viewpoints"));
    Comments = conn.model("Comments", require("../../Comments/Models/comments"))
    module.exports = conn;

    var viewpointsArr = []

    await Comments.find({topic_guid: topicId})
    .select("viewpoint_guid -_id")
    .exec()
    .then(doc => {
        for(var key in doc) {
            data = doc[key]["viewpoint_guid"]
            console.log(data)
            if (data) {
                viewpointsArr.push(data)
                
            }
            
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
    console.log(viewpointsArr)

    Viewpoints.find({guid: { $in: viewpointsArr}})
    .select("index guid orthogonal_camera perspective_camera lines clipping_planes bitmaps snapshot components -_id")
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

exports.viewpoint_get =  (req, res, next) => {

    const id = req.params.projectId;
    const viewpointId = req.params.viewpointId;

    const conn = mongoose.createConnection('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/'+ id + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });

    Viewpoints = conn.model("Viewpoints", require("../Models/viewpoints"));
    module.exports = conn;


    Viewpoints.findOne({guid: viewpointId})
    .select("index guid orthogonal_camera perspective_camera lines clipping_planes bitmaps snapshot components -_id")
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

exports.viewpoint_get_snapshot =  (req, res, next) => {

    const id = req.params.projectId;
    const viewpointId = req.params.viewpointId;

    const conn = mongoose.createConnection('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/'+ id + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });

    Viewpoints = conn.model("Viewpoints", require("../Models/viewpoints"));
    module.exports = conn;


    Viewpoints.findOne({guid: viewpointId})
    .select("snapshot -_id")
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

exports.viewpoint_get_bitmap =  (req, res, next) => {

    const id = req.params.projectId;
    const viewpointId = req.params.viewpointId;
    const bitmapId = req.params.bitmapId;

    const conn = mongoose.createConnection('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/'+ id + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });

    Viewpoints = conn.model("Viewpoints", require("../Models/viewpoints"));
    module.exports = conn;


    Viewpoints.findOne({"bitmaps.guid": bitmapId})
    .select("bitmaps.guid bitmaps.height bitmaps.up bitmaps.normal bitmaps.location bitmaps.bitmap_data bitmaps.bitmap_type -_id")
    .exec()
    .then(doc => {
        res.status(200).json(doc["bitmaps"]);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

};

exports.viewpoint_get_selection =  (req, res, next) => {

    const id = req.params.projectId;
    const viewpointId = req.params.viewpointId;

    const conn = mongoose.createConnection('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/'+ id + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });

    Viewpoints = conn.model("Viewpoints", require("../Models/viewpoints"));
    module.exports = conn;


    Viewpoints.findOne({guid: viewpointId})
    .select("components.selection -_id")
    .exec()
    .then(doc => {
        res.status(200).json(doc["components"]);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

};

exports.viewpoint_get_coloring =  (req, res, next) => {

    const id = req.params.projectId;
    const viewpointId = req.params.viewpointId;

    const conn = mongoose.createConnection('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/'+ id + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });

    Viewpoints = conn.model("Viewpoints", require("../Models/viewpoints"));
    module.exports = conn;


    Viewpoints.findOne({guid: viewpointId})
    .select("components.coloring -_id")
    .exec()
    .then(doc => {
        res.status(200).json(doc["components"]);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

};

exports.viewpoint_get_visibility =  (req, res, next) => {

    const id = req.params.projectId;
    const viewpointId = req.params.viewpointId;

    const conn = mongoose.createConnection('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/'+ id + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });

    Viewpoints = conn.model("Viewpoints", require("../Models/viewpoints"));
    module.exports = conn;


    Viewpoints.findOne({guid: viewpointId})
    .select("components.visibility -_id")
    .exec()
    .then(doc => {
        res.status(200).json(doc["components"]);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

};

exports.viewpoint_create = (req, res, next) => {

    const id = req.params.projectId;
    const topicId = req.params.topicId

    const conn = mongoose.createConnection('mongodb+srv://bloodwyn:' + process.env.MONGO_ATLAS_PW + '@bcfcluster-e9rwn.mongodb.net/'+ id + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });

    // TODO: Include Timezone

    const timestamp = new Date(Date.now()).toISOString();

    Viewpoints = conn.model("Viewpoints", require("../Models/viewpoints"));
    module.exports = conn;

    var bitmapsArr = []

    for (var bitmap in req.body.bitmaps) {
        var data = req.body.bitmaps[bitmap]
        // console.log(data)
        data["guid"] = uuid.v4();
        bitmapsArr.push(data);
    }

    // console.log(bitmapsArr)

    const comment = new Viewpoints({
        _id: new mongoose.Types.ObjectId(),
        guid: uuid.v4(),
        date: timestamp,
        orthogonal_camera: req.body.orthogonal_camera,
        perspective_camera: req.body.perspective_camera,
        lines: req.body.lines,
        clipping_planes: req.body.clipping_planes,
        bitmaps: bitmapsArr,
        snapshot: req.body.snapshot,
        components: req.body.components
    });

    comment
        .save()
        .then(result => {
        console.log(result);
        res.status(201).json({
            guid: result.guid,
            date: result.date,
            orthogonal_camera: result.orthogonal_camera,
            perspective_camera: result.perspective_camera,
            lines: result.lines,
            clipping_planes: result.clipping_planes,
            bitmaps: result.bitmaps,
            snapshot: result.snapshot,
            components: result.components
            });
        })
        .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.viewpoint_update = (req, res, next) => {

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