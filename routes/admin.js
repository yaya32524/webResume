var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require('crypto');
var formidable = require('formidable');
mongoose.connect('mongodb://127.0.0.1:27017/cvdb', { useMongoClient: true });
var userinfoSchema = new mongoose.Schema({
  ename: String,
  genter: String,
  age: Number,
  home: String,
  major: String,
  education: String,
  school: String,
  skill: String,
  address: String,
  qq: String,
  email: String,
  describe: String,
  skilldescribe: String,
  code: String,
  worktime: Number,
  money: Number,
  saying: String,
  introduce1: String,
  introduce2: String,
  introduce3: String
});
var userinfo = mongoose.model('userinfo', userinfoSchema);
/* GET home page. */
router.get('/admin', function (req, res, next) {
  var _user = req.session.user;
  if (_user) {
    res.locals.username = _user;
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
            res.render('admin', { user: data, web: doc, exp, ems });
          })
        });
      });
    });
  } else {
    return res.redirect('/login');
  }
});
router.post('/update', function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, field, files) {
    mongoose.model('userinfo').update({
      '$set': field
    }, function () {
      res.redirect('/admin');
      res.end();
    });
  });
});


router.post('/adminUpdate', function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, field, files) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(field.password).digest('base64');
    mongoose.model('admin').update({
      '$set': {
        'username': field.username,
        'password': password
      }
    }, function () {
      delete req.session.user;
      return res.redirect('/login');
    });
  });
});
module.exports = router;
