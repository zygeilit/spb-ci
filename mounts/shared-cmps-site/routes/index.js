var express = require('express');
var router = express.Router();

var AV = require('leanengine');

AV.init({
  appId: 'CJ3ctXdwAtvLcT2SsH2aln02-gzGzoHsz',
  appKey: '0bNr0AASzaMz5Esl5an4gP1H',
  // masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || 'tN1r7b8ME3tvKFS0z9h8Dplt'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '列表' });
});

router.get('/cmp-detail', function(req, res, next) {
  res.render('cmp-detail', { title: '详情' });
});

router.get('/users/get-cmps', function(req, res, next) {
  new AV.Query('Components').find().then(function(products) {
  	var cmplist = []
      products.forEach(function(product) {
        cmplist.push(product.get('metadata'))
      })
      res.json(cmplist)
    }).catch(function(error) {
      throw new Error(error)
    })
})

module.exports = router;
