var assert = require('assert')

exports = function (colname, doc, done) {
  var collection = this.db.collection(colname)
  collection.insert(doc, function(err, result) {
    assert.equal(null, err)
    done(result)
  })
}
