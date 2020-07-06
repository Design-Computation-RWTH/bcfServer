const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    project_id: { 
        type: String,
        required: true,
        unique: true,
         },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Projects', projectSchema);