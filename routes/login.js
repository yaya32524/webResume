var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require('crypto');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var formidable = require('formidable');
var mongoStore = require('connect-mongo')(session);
var app = express();
app.use(cookieParser());
app.use(session({
    secret: 'cvweb',
    store: new mongoStore({
        url: "mongodb://127.0.0.1:27017/cvdb",
        collection: 'sessions'
    }),
    // set session time;
    // cookie: {maxAge: 6000 } 
}))
mongoose.connect('mongodb://127.0.0.1:27017/cvdb', { useMongoClient: true });

var adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

var admin = mongoose.model('admin', adminSchema);
/* GET home page. */
router.post('/login', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, field, files) {
        mongoose.model('admin').findOne({ username: field.username }, function (err, data) {
            if (!data) {
                res.render('login', { msg: "账号不存在！" });
            } else {
                var md5 = crypto.createHash('md5');
                var password = md5.update(field.password).digest('base64');
                if (password == data.password) {
                    // set session time
                    var hour = 360000;
                    req.session.cookie.expires = new Date(Date.now() + hour);
                    req.session.cookie.maxAge = hour;
                    req.session.user = data;
                    return res.redirect('/admin');
                } else {
                    res.render('login', { msg: "密码错误！", });
                }
            }
        })
    });
});

// logout
router.get('/logout', function (req, res) {
    delete req.session.user;
    return res.redirect('/login');
});

router.get('/login', function (req, res) {
    // 密码忘记了可以把下面代码取消注释。（把原数据删除）
    // var md5 = crypto.createHash('md5');
    // mongoose.model('admin').create({username:"yaya32524",password:md5.update('a123456').digest('base64')},function(){
    //     console.log('数据新增成功！');
    //     res.end('1');
    // });
    if (req.session.user) {
        return res.redirect('/admin');
    }
    res.render('login');
});

module.exports = router;
