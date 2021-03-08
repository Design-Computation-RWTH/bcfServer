const mongoose = require('mongoose');

// TODO: There is probably a better way to achieve this!  

module.exports = async (req, res, next) =>{

    console.log("Check Bindings")

    const id = req.params.projectId;

    const conn = mongoose.createConnection(process.env.MONGO_ATLAS_URL + id + '?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology:true
    });

    Extensions = conn.model("Extensions", require("../../Projects/Models/extensions"));
    module.exports = conn;

    var topic_type = []
    var topic_status = []
    var topic_label = []
    var priority = []
    var user_id_type = []
    var stage = []

    // get the extensions from the server

    await Extensions.find()
    .exec()
    .then(docs => {
        topic_type = docs[0].topic_type,
        topic_status = docs[0].topic_status,
        topic_label = docs[0].topic_label,
        priority = docs[0].priority,
        user_id_type = docs[0].user_id_type
        stage = docs[0].stage
    })

    // check if the topic bindings stick to the extensions

    try{
        
        if (req.body["topic_type"]) {

            if (!topic_type.includes(req.body["topic_type"])) {
                return res.status(400).json({
                    Message: 'Could not find "' + req.body["topic_type"] + '" in the projects type extensions'
                })
            }
        }

        if (req.body["topic_status"]) {

            if (!topic_status.includes(req.body["topic_status"])) {
                return res.status(400).json({
                    Message: 'Could not find "' + req.body["topic_status"] + '" in the projects status extensions'
                })
            }
        }

        if (req.body["priority"]) {

            if (!priority.includes(req.body["priority"])) {
                return res.status(400).json({
                    Message: 'Could not find "' + req.body["priority"] + '" in the projects priority extensions'
                })
            }
        }

        if (req.body["assigned_to"]) {

            if (!user_id_type.includes(req.body["assigned_to"])) {
                return res.status(400).json({
                    Message: 'Could not find "' + req.body["assigned_to"] + '" in the project user extensions'
                })
            }
        }

        if (req.body["stage"]) {

            if (!stage.includes(req.body["stage"])) {
                return res.status(400).json({
                    Message: 'Could not find "' + req.body["stage"] + '" in the projects stage extensions'
                })
            }
        }

        if (req.body["label"]) {
            console.log("true")
        }


        for (label in req.body["labels"]) {
             
            if (req.body["labels"][label]) {

                if (!topic_label.includes(req.body["labels"][label])) {
                    return res.status(400).json({
                        Message: 'Could ?? not find "' + req.body["labels"][label] + '" in the project extensions'
                    })
                }
            }

        }


        next();
    } catch (error) {
        return res.status(401).json({
            message: error
        });
    }
}