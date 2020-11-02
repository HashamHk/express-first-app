var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test'


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'form Validation', success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
});

router.get('/get-data' , function(req, res, next){
  var resultArray = [];
  mongo.connect(url, function(err, db){
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err){
      resultArray.push(doc);
    }, function(){
      db.close();
      res.render('index', {items: resultArray});
    });
  });
});

router.post('/insert' , function(req, res, next){
  console.log(req);
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').insertOne(item, function(err, result) {
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/');
});
router.post('/update' , function(req, res, next){
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
      console.log('Item Updated');
      db.close();
    });
  });
});
router.post('/delete' , function(req, res, next){
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result) {
      console.log('Item Deleted');
      db.close();
    });
  });
});

// router.post('/submit', function(req , res, next){
//   req.check('email', 'Invalid Email Adress !').isEmail();
//   req.check('password', 'Password is Invalid !').isLength({min: 4}).equals(req.body.confirmPassword);

//   var errors = req.validationErrors();
//   if (errors){
//     req.session.errors = errors;
//     req.session.success = false;
//   } else {
//     req.session.success = true;
//   }
//   res.redirect('/');
// });

module.exports = router;