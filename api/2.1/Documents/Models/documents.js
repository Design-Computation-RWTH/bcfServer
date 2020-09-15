const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guid: { 
        type: String,
        required: true,
         },
    filename: {
        type: String,
        required: true
    },
    file: {
        type: Buffer,
        required: true
    }
});

module.exports = documentSchema;