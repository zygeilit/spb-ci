var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '列表' });
});

router.get('/cmp-detail', function(req, res, next) {
  res.render('cmp-detail', { title: '详情' });
});

module.exports = router;
