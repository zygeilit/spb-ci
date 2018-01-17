var assert = require('assert')
var MongoClient = require('mongodb').MongoClient


module.exports = function Database (props) {
  Object.assign(this, {
    host: 'mongodb',
    prot: '27017',
    name: 'doc-web-server',
    state: {
      db: null
    }
  }, props)
}

Database.prototype = {

  test: function () {
    MongoClient.connect(`mongodb://${this.host}:${this.port}/${this.name}`, function(err, db) {
      assert.equal(null, err)
      console.log("Connected successfully to server")
    })
  },

  connect: function () {
    return Promise(function (resolve, reject) {
      // 已经连接，直接返回db对象
      if (this.state.db) return resolve(this.state.db)
      MongoClient.connect(`mongodb://${this.host}:${this.port}/${this.name}`, function(err, db) {
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
