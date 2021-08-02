const mongoose = require("mongoose");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

function setConnection(id) {
  connection = cache = mongoose.createConnection(
    process.env.MONGO_ATLAS_URL + id + "?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  return connection;
}

function checkCache(id) {
  // console.log(mongoose.connections);

  // check if Connection is already defined
  if (cache == undefined) {
    cache = setConnection(id);
    return cache;
  } else {
    // check if we are connected to the right server, if not change connection
    if (cache.name == id) {
      return cache;
    } else {
      var connections = mongoose.connections;
      for (connection in connections) {
        var connectionDict = connections[connection];
        if (connectionDict.name == id) {
          cache = connectionDict;
          console.log("switched to existing cache");
          return cache;
        }
      }
      cache = setConnection(id);
      return cache;
    }
  }
}
