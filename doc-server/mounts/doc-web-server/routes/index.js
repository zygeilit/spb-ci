var express = require('express')
var router = express.Router()
var Database = require('../mongodb/database')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/api/add', function(req, res, next) {
  var db = new Database()
  res.render('index', { title: 'Express' });
});

module.exports = router;
