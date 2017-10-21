/* GET users listing. */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var formidable = require('formidable');

mongoose.connect('mongodb://127.0.0.1:27017/cvdb', { useMongoClient: true });

var webSchema = new mongoose.Schema({
  "webname": String,
  "url": String,
  "technology": String,
  "type": String,
  "fileimg": String
});
var web = mongoose.model('web', webSchema);

var exprienceSchema = new mongoose.Schema({
  "bgimg": String,
  "company": String,
  "position": String,
  "zzms": String
});
var exprience = mongoose.model('exprience', exprienceSchema);


var emailSchema = new mongoose.Schema({
  nickname: String,
  useremail: String,
  content: String,
  addTime: Date
});

var email = mongoose.model('email', emailSchema);

// 删除项目经验信息
router.get('/webobj*', function (req, res, next) {
  console.log(req.query._id);
  var id = mongoose.Types.ObjectId(req.query._id);
  mongoose.model('web').remove({ "_id": id }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json({ 'msg': 1 });
    }
  });
});
// 更新项目经验信息
router.post('/webobj*', function (req, res) {
  var form = new formidable.IncomingForm();
  //保留文件后缀名
  form.keepExtensions = true;
  //设置文件上传目录
  form.uploadDir = '../public/images/pace';
  form.parse(req, function (err, field, files) {
    console.log(field);
    if (files.fileimg.name) {
      var filePath = files.fileimg.path.split('\\');
      var array = [];
      for (var i = 2; i < filePath.length; i++) {
        array.push(filePath[i]);
      }
      field.fileimg = array.join('\\');;
    }
    mongoose.model('web').update({ "_id": mongoose.Types.ObjectId(req.query._id) }, {
      $set: field
    }, function (err) {
      res.redirect('/admin');
      res.end();
    });
  });
});

// 更新人生经历信息
router.post('/exprience*', function (req, res) {
  var form = new formidable.IncomingForm();
  //保留文件后缀名
  form.keepExtensions = true;
  //设置文件上传目录
  form.uploadDir = '../public/images/pace';
  form.parse(req, function (err, field, files) {
    if (files.bgimg.name) {
      var filePath = files.bgimg.path.split('\\');
      var array = [];
      for (var i = 2; i < filePath.length; i++) {
        array.push(filePath[i]);
      }
      field.bgimg = array.join('\\');;
    }
    mongoose.model('exprience').update({ "_id": mongoose.Types.ObjectId(req.query._id) }, {
      $set: field
    }, function (err) {
      res.redirect('/admin');
      res.end();
    });
  });
});

// 删除人生经历信息
router.get('/exprience*', function (req, res, next) {
  console.log(req.query._id);
  var id = mongoose.Types.ObjectId(req.query._id);
  mongoose.model('exprience').remove({ "_id": id }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json({ 'msg': 1 });
    }
  });
});

// 删除邮箱信息
router.get('/email*', function (req, res, next) {
  console.log(req.query._id);
  var id = mongoose.Types.ObjectId(req.query._id);
  mongoose.model('email').remove({ "_id": id }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json({ 'msg': 1 });
    }
  });
});


// 添加项目经验信息
router.post('/upweb', function (req, res) {
  var form = new formidable.IncomingForm();
  //保留文件后缀名
  form.keepExtensions = true;
  //设置文件上传目录
  form.uploadDir = '../public/images/pace';
  form.parse(req, function (err, field, files) {
    if (files.fileimg.name) {
      var filePath = files.fileimg.path.split('\\');
      var array = [];

      for (var i = 2; i < filePath.length; i++) {
        array.push(filePath[i]);
      }
      field.fileimg = array.join('\\');;
      mongoose.model('web').create(field, function () {
        res.redirect('/admin');
        res.end();
      });
    }
  });
});

// 添加人生经历信息
router.post('/upexperience', function (req, res) {
  var form = new formidable.IncomingForm();
  //保留文件后缀名
  form.keepExtensions = true;
  //设置文件上传目录
  form.uploadDir = '../public/images/pace';
  form.parse(req, function (err, field, files) {
    if (files.bgimg.name) {
      var filePath = files.bgimg.path.split('\\');
      var array = [];

      for (var i = 2; i < filePath.length; i++) {
        array.push(filePath[i]);
      }
      field.bgimg = array.join('\\');;
      mongoose.model('exprience').create(field, function () {
        res.redirect('/admin');
        res.end();
      });
    }
  });
});

module.exports = router;
