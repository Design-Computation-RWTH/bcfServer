const mongoose = require('mongoose');
const uuid = require("uuid");
const jwt = require("jsonwebtoken");


function setConnection(id) {

    connection = cache = mongoose.createConnection(process.env.MONGO_ATLAS_URL + id + '?retryWrites=true&w=majority', {
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

