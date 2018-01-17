
var assert = require('assert')
var MongoClient = require('mongodb').MongoClient

module.exports = function Database (props) {

  Object.assign(this, props)
  assert.equal(this, this.dbhost)
  assert.equal(this, this.dbport)
  assert.equal(this, this.dbname)

  this.state = { db: null }
}

Database.prototype = {

  connect: function () {
    return Promise(function (resolve, reject) {
      // 已经连接，直接返回db对象
      if (this.state.db) return resolve(this.state.db)
      MongoClient.connect(this.urlurl, function(err, db) {
        if (err) return done(err)
        console.log("Connected successfully to server")
        state.db = db
        resolve(db)
      })
    })
  },

  get: function () {
    return this.state.db
  },

  close: function(done) {
    if (this.state.db) {
      this.state.db.close(function(err, result) {
        state.db = null
        done(err)
      })
    }
  },

  insert: function (cname, doc) {
    return new Promise(function (resolve, reject) {
      this.connect().then(function () {
        var collection = this.db.collection(cname)
        collection.insert(doc).then(result) {
          resolve(result)
        }
      })
    })
  }
}
