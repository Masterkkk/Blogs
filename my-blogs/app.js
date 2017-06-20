var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var app = express();

//配置art-template模板引擎
var template = require('art-template');
template.config('base','');
template.config('extname','.html');
//定义当前应用使用的模板引擎，参数一 模板引擎 同时也是模板文件的后缀
//参数二  解析模板的方法
app.engine('.html',template.__express);
//注册所使用的模板引擎
app.set('view engine', 'html');
//配置模板文件所在的路径，views文件夹下的文件
app.set('views', __dirname + '/views');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('333'));
//配置session模块
app.use(session({
    name: 'test',
    secret: '333',
    resave: true,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/home',require('./routes/user/home'));
app.use('/user',require('./routes/user/login'));
app.use('/article',require('./routes/user/article'));
app.use('/detail',require('./routes/user/detail'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
