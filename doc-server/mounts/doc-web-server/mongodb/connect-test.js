var MongoClient = require('mongodb').MongoClient

// Connect to the mongodb
MongoClient.connect("mongodb://mongodb:27017/doc-web-server", function(err, db) {
  if (err) {
    console.log("connected error");
  }
})
