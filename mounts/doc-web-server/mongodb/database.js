var assert = require('assert')
var MongoClient = require('mongodb').MongoClient
var Promise = require('promise')

function Database (props) {
  this.dbhost = 'mongodb'
  this.dbport = '27017'
  this.dbname = 'doc-web-server'
  this.collection = 'doc.models'
  this.state = {
    db: null,
    client: null
  }
}

Database.prototype = {

  connect: function () {
    var self = this
    return new Promise(function (resolve, reject) {
      // 已经连接，直接返回db对象
      if (self.state.db) return resolve(true)
      MongoClient.connect(`mongodb://${self.dbhost}:${self.dbport}`, function(err, client) {
        if (err) return resolve(err.toString())
        // 存储连接对象和库对象，库对象直接传递给指令函数，连接对象用户关闭数据库连接
        self.state.client = client
        self.state.db = client.db(self.dbname)
        resolve(true)
      })
    })
  },

  get: function () {
    return this.state.db
  },

  close: function() {
    var self = this
    if (self.state.db) {
      self.state.client.close(function(err, result) {
        self.state.db = null
      })
    }
  },

  insert: function (doc, cname) {
    var self = this
    return new Promise(function (resolve, reject) {
      self.connect().then(function () {
        var collection = self.state.db.collection(cname || self.collection)
        collection.insert(doc, function () {
          resolve({ code: 200 })
          self.close()
        })
      })
    })
  }
}

module.exports = Database
