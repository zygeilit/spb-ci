var express = require('express')
var router = express.Router()
var Database = require('../mongodb/database')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  var doc = {
    'type': req.query.type,
    'author': req.query.author,
    'keywords': req.query.keywords.split(',')
  }
  new Database()
    .insert(doc)
    .then(function (result) {
      res.send(JSON.stringify(result))
    })
});

module.exports = router;
