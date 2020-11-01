var express = require('express');
// const { get, route } = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'form Validation', success: false, errors: req.session.errors });
  req.session.errors = null;
});

router.post('/submit', function(re, res, next){
  // CHeck validity
});

module.exports = router;