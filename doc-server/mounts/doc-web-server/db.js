// var MongoClient = require('mongodb').MongoClient

var state = {
  db: null
}

// Retrieve
var MongoClient = require('mongodb').MongoClient

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/doc-web-server", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
})

// MongoClient.connect('mongodb://mongodb:27017/test', function(err, db) {
//   if (err) return
//   var collection = db.collection('foods')
//   collection.insert({name: 'taco', tasty: true}, function(err, result) {
//     collection.find({name: 'taco'}).toArray(function(err, docs) {
//       console.log(docs[0])
//       db.close()
//     })
//   })
// })

// exports.state = state

// exports.connect = function(url, done) {
//   if (state.db) return done()

//   MongoClient.connect(url, function(err, db) {
//     if (err) return done(err)
//     state.db = db
//     done()
//   })
// }

// exports.get = function() {
//   return state.db
// }

// exports.close = function(done) {
//   if (state.db) {
//     state.db.close(function(err, result) {
//       state.db = null
//       state.mode = null
//       done(err)
//     })
//   }
// }
