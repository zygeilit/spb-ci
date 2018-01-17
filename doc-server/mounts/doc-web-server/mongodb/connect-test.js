var MongoClient = require('mongodb').MongoClient
var assert = require('assert')

// Connect to the mongodb
MongoClient.connect(`mongodb://mongodb:27017/doc-web-server`, function(err, client) {
  assert.equal(null, err)
  console.log("Connected successfully to server")
})
