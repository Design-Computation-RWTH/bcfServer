const mongoose = require('mongoose');
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { countDocuments } = require('../../User/Models/user');

var cache = undefined;

function checkCache(id) {
    // check if Connection is already defined
    console.log
    if(cache==undefined){
        // if not create a connection to the database and save the connection to the cache variable, so that we only have one connection per database + collection
        cache = mongoose.createConnection(process.env.MONGO_ATLAS_URL + id + '?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
        console.log("cached")
        return cache
    } else {

        return cache
    }
};

exports.documents_get =  (req, res, next) => {

    const id = req.params.projectId;

    const conn = checkCache(id)

    Documents = conn.model("Documents", require("../Models/documents"));
    module.exports = conn;


    Documents.find()
    .select("-file -_id -__v")
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

        req.rawBody = data;

        const document = new Document({
            _id: new mongoose.Types.ObjectId(),
            guid: uuid.v4(),
            filename: req.header("Content-Disposition").split("=")[1].slice(1, -1),
            file: data
        });
    
        document
            .save()
            .then(result => {
            //console.log(result);
            res.status(201).json({
                guid: result.guid,
                filename: result.filename,
                });
            })
            .catch(err => {
            //console.log(err);
            res.status(500).json({
                error: err
            });
        });
        // console.log(req.rawBody)
    });
};


