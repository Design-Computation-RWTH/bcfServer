const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicsSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guid: { 
        type: String,
        required: true,
         },
    creation_author: {
        type: String,
        required: false
    },
    creation_date: {
        type: Date,
        required: true
    },
    topic_type: {
        type: String,
        required: false
    },
    topic_status: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    priority: {
        type: String,
        required: false
    },
    labels: {
        type: Array,
        required: false
    },
    assigned_to: {
        type: String,
        required: false
    },
    modified_author: {
        type: String,
        required: false
    },
    modified_date: {
        type: Date,
        required: false
    },
    stage: {
        type: String,
        required: false
    }
});

// module.exports = mongoose.model('Extensions', extensionsSchema);
module.exports = topicsSchema;