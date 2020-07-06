const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guid: { 
        type: String,
        required: true
         },
    date: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    topic_guid: {
        type: String,
        required: false
    },
    viewpoint_guid: {
        type: String,
        required: false
    },
    reply_to_comment_guid: {
        type: String,
        required: false
    },
    modified_date: {
        type: String,
        required: false
    },
    modified_author: {
        type: String,
        required: false
    }
});

// module.exports = mongoose.model('Comments', commentsSchema);
module.exports = commentsSchema;