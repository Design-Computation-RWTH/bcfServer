const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: { 
        type: String,
        required: true,
        unique: true,
         },
    name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema);