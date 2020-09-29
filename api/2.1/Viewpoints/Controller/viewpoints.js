const mongoose = require('mongoose');
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const fs = require("fs");

var cache = undefined;

function setConnection(id) {

    connection = mongoose.createConnection(process.env.MONGO_ATLAS_URL + id + '?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology:true
    });
    return connection;

};

function checkCache(id) {
    // check if Connection is already defined
    if(cache==undefined){
        cache = setConnection(id);
        return cache
    } else {
        // check if we are connected to the right server, if not change connection
        if(cache.name == id){
            return cache;
        } else {
            cache = setConnection(id);
            return cache;
        }
    }
};

exports.viewpoints_get =  async (req, res, next) => {

    const id = req.params.projectId;
    const topicId = req.params.topicId;

    // const conn = mongoose.createConnection(process.env.MONGO_ATLAS_URL + id + '?retryWrites=true&w=majority', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology:true
    // });

    const conn = checkCache(id);


    Viewpoints = conn.model("Viewpoints", require("../Models/viewpoints"));
    Comments = conn.model("Comments", require("../../Comments/Models/comments"))
    module.exports = conn;

    Viewpoints.find({topic_guid: topicId})
    .select("index guid orthogonal_camera perspective_camera lines clipping_planes bitmaps components -_id")
    .exec()
    .then(doc => {
        //console.log(doc)
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

    // const conn = mongoose.createConnection(process.env.MONGO_ATLAS_URL + id + '?retryWrites=true&w=majority', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology:true
    // });

    const conn = checkCache(id);

    Viewpoints = conn.model("Viewpoints", require("../Models/viewpoints"));
    module.exports = conn;


    Viewpoints.findOne({guid: viewpointId})
    .select("index guid orthogonal_camera perspective_camera lines clipping_planes bitmaps snapshot components -_id")
    .exec()
    .then(doc => {
        res.status(200).json({
            guid: doc.guid,
            perspective_camera: doc.perspective_camera,
            orthogonal_camera: doc.orthogonal_camera,
            lines: doc.lines,
            clipping_planes: doc.clipping_planes
        });
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

    // const conn = mongoose.createConnection(process.env.MONGO_ATLAS_URL + id + '?retryWrites=true&w=majority', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology:true
    // });

    const conn = checkCache(id);

    Viewpoints = conn.model("Viewpoints", require("../Models/viewpoints"));
    module.exports = conn;


    Viewpoints.findOne({guid: viewpointId})
    .select("-_id")
    .exec()
    .then(doc => {
        
        var data = doc.snapshot.snapshot_data;
        var buff = new Buffer.from(data.toString(),"base64")
        console.log(buff)
        res.status(200).send(buff);

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

    // const conn = mongoose.createConnection(process.env.MONGO_ATLAS_URL + id + '?retryWrites=true&w=majority', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology:true
    // });

    const conn = checkCache(id);

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

    // const conn = mongoose.createConnection(process.env.MONGO_ATLAS_URL + id + '?retryWrites=true&w=majority', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology:true
    // });

    const conn = checkCache(id);

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

    // const conn = mongoose.createConnection(process.env.MONGO_ATLAS_URL + id + '?retryWrites=true&w=majority', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology:true
    // });

    const conn = checkCache(id);

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

    // const conn = mongoose.createConnection(process.env.MONGO_ATLAS_URL + id + '?retryWrites=true&w=majority', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology:true
    // });

    const conn = checkCache(id);

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

    // const conn = mongoose.createConnection(process.env.MONGO_ATLAS_URL + id + '?retryWrites=true&w=majority', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology:true
    // });

    const conn = checkCache(id);

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
    var baseString = req.body.snapshot.snapshot_data

    var data = new Buffer.from(baseString)


    const snapshot = {
        snapshot_type: req.body.snapshot.snapshot_type,
        snapshot_data: data
    }

    res.status(200);
    const viewpoint = new Viewpoints({
        _id: new mongoose.Types.ObjectId(),
        guid: uuid.v4(),
        date: timestamp,
        orthogonal_camera: req.body.orthogonal_camera,
        perspective_camera: req.body.perspective_camera,
        lines: req.body.lines,
        clipping_planes: req.body.clipping_planes,
        bitmaps: bitmapsArr,
        snapshot: snapshot,
        components: req.body.components,
        topic_guid: topicId
    });

    viewpoint
        .save()
        .then(result => {
        //console.log(result);
        res.status(201).json({
            guid: result.guid,
            date: result.date,
            orthogonal_camera: result.orthogonal_camera,
            perspective_camera: result.perspective_camera,
            lines: result.lines,
            clipping_planes: result.clipping_planes,
            // bitmaps: result.bitmaps,
            snapshot: {snapshot_type: req.body.snapshot.snapshot_type},
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

//PUT Viewpoint is not part of the official API. Normally a Viewpoint should not be changed after creation

exports.viewpoint_update = (req, res, next) => {

    const id = req.params.projectId;
    const viewpointId = req.params.viewpointId
    const timestamp = new Date(Date.now()).toISOString();

    // const conn = mongoose.createConnection(process.env.MONGO_ATLAS_URL + id + '?retryWrites=true&w=majority', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology:true
    // });

    const conn = checkCache(id);

    Viewpoint = conn.model("Viewpoints", require("../Models/viewpoints"));
    module.exports = conn;

    var data = req.body

    // Setting modified author and date is not part of BCF API and usually not necessary. For our scenario we nevertheless might need to add it
    // data["modified_author"] = jwt.decode(req.headers.authorization.split(" ")[1]).id
    // data["modified_date"] = timestamp
    
    Viewpoint.findOneAndUpdate({guid: viewpointId}, {$set: req.body}, {new: true })
        //.select("guid date author comment topic_guid modified_author modified_date viewpoint_guid -_id")
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