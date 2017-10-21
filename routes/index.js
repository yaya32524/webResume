var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var formidable = require('formidable');
/* GET home page. */
router.get(['/', '/index'], function (req, res, next) {
  mongoose.model('userinfo').findOne({}, function (err, data) {
    if (err) {
      return;
    }
    mongoose.model('web').find({}, function (err, doc) {
      if (err) {
        return;
      }
      mongoose.model('exprience').find({}, function (err, exp) {
        mongoose.model('email').find({}, function (err, ems) {
          res.render('index', { user: data, web: doc, exp, ems });
        });
      });
    });
  });
});

router.post('/sendemail', function (req, res) {
  var form = new formidable.IncomingForm();
  var date=new Date();
  form.parse(req, function (err, field, files) {
    field.addTime=date;
    mongoose.model('email').create(field, function (err, ems) {
      if(err){
        console.log(err);
        return;
      }
      res.json({msg:1});
    });
  });
});

module.exports = router;
