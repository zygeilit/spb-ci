var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/api/add', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;