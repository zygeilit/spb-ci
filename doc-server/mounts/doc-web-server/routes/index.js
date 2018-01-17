var express = require('express')
var router = express.Router()
var Database = require('../mongodb/database')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  var db = new Database()
  db.insert({ name: 'test/add/01' }).then(function (result) {
    res.send(JSON.stringify(result))
  })
});

module.exports = router;
