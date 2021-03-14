const mongoose = require('mongoose');
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { countDocuments } = require('../../User/Models/user');

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

exports.documents_get =  (req, res, next) => {

    const id = req.params.projectId;
    //console.log(id)
    const conn = checkCache(id)
    //console.log(conn)

    Documents = conn.model("Documents", require("../Models/documents"));
    module.exports = conn;


    Documents.find()
    .select("-file -_id -__v")
    .exec()
    .then(doc => {
        //console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

};

exports.document_get =  (req, res, next) => {

    const id = req.params.projectId;
    const documentId = req.params.documentId;

    const conn = checkCache(id);

    Documents = conn.model("Documents", require("../Models/documents"));
    module.exports = conn;
  
    Documents.findOne({guid: documentId})
    .select("-_id")
    .exec()
    .then(doc => {
        var data = doc.file;
        var buff = new Buffer.from(data, "")
        console.log(buff)
        res.status(200).send(buff);

    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

};

exports.documents_post =  (req, res, next) => {

    const id = req.params.projectId;

    const conn = checkCache(id)

    Document = conn.model("Documents", require("../Models/documents"));
    module.exports = conn;

    //console.log(req)

    // const document = new Document

    var data = new Buffer.from("")

    req.on("data", function(chunk) {
        data = Buffer.concat([data, chunk]);

    });
    req.on("end", function() {

        
        const filename = req.header("Content-Disposition").split("=")[1].split('"')[1];
        const description = req.header("Content-Disposition").split("=")[2].split('"')[1]

        console.log(filename)
        console.log(description)

        var foundDocument = false
        req.rawBody = data;

        Document.findOneAndUpdate({filename: filename}, {file: data}, {new: true })
        .exec()
        .then(result => {
            
            if(result != null){
                res.status(200).json(result)
            } else {
                const document = new Document({
                    _id: new mongoose.Types.ObjectId(),
                    guid: uuid.v4(),
                    filename: filename,
                    description: description,
                    file: data
                });
            
                document
                    .save()
                    .then(result => {
                    //console.log(result);
                    res.status(201).json({
                        guid: result.guid,
                        filename: result.filename,
                        description: result.description
                        });
                    })
                    .catch(err => {
                    //console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
            };
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


    });
};

exports.spatial_representation_get =  (req, res, next) => {

    const id = req.params.projectId;
    const documentId = req.params.documentId;

    const conn = checkCache(id);

    SpatialRepresentation = conn.model("SpatialRepresentations", require("../Models/spatial_representation"));
    module.exports = conn;
  
    SpatialRepresentation.findOne({documentId: documentId})
    .select("-_id")
    .exec()
    .then(doc => {
        res.status(200).json(doc);;
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

};

exports.spatial_representation_update = (req, res, next) => {

    const id = req.params.projectId;
    const documentId = req.params.documentId;

    const conn = checkCache(id);

    SpatialRepresentation = conn.model("SpatialRepresentation", require("../Models/spatial_representation"));
    module.exports = conn;

    const representation = {
        documentId: documentId,
        alignment: req.body.alignment,
        location: req.body.location,
        rotation: req.body.rotation,
        scale: req.body.scale
    }

    console.log(req.body.location)

    // TODO: update document 

    SpatialRepresentation.findOneAndUpdate({documentId: documentId}, {$set: representation}, {new: true })
    .exec()
    .then(result => { 
        if(result != null){
            console.log("if")
            res.status(200).json(result)
        } else {
            console.log("else")
            const spatialRepresentation = new SpatialRepresentation({
                _id: new mongoose.Types.ObjectId(),
                documentId: documentId,
                alignment: representation.alignment,
                location: representation.location, 
                rotation: representation.rotation,
                scale: representation.scale
            });
            console.log(spatialRepresentation)
            spatialRepresentation
            .save()
            .then(result => {
                res.status(200).json({
                    documentId: result.documentId,
                    alignment: result.alignment,
                    location: result.location, 
                    rotation: result.rotation,
                    scale: result.scale
                });
            })
            .catch(err => {
            //console.log(err);
            res.status(500).json({
                error: err
                });
            });
        };
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
            });
        });
};

