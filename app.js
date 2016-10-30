var express = require('express');//Express 嗯 不知道
var path = require('path'); //路径 不知道
var mongoose = require('mongoose'); //芒果数据库
var dbUrl = 'mongodb://localhost/imooc';
var port=process.env.PORT || 3000; //端口
var bodyParser = require('body-parser'); //转换form实体的
var _ = require('underscore'); //不知道
var app = express(); //启动？ 不知道
var fs = require('fs');
var logger = require('morgan');
//var _mongoStore = require('connect-mongo');

var cookieParser = require('cookie-parser')//CookieSission
var session = require('express-session')//CookieSission

mongoose.connect(dbUrl);// 连接数据库
var models_path = __dirname+'/app/models';
var walk = function(path) {
  fs
    .readdirSync(path)
    .foreach(function(file){
      var newPath = path+'/'+file;
      var stat = fs.statSync(newPath);

      if(stat.isFile()){
        if(/(.*)\.(js|coffee)/.test(file)){
          require(newPath);
        }
      }
      else if(stat.isDirectory()){
        walk(newPath);
      }
    });
}

app.set('views','./app/views/pages'); //配置页面文件夹路径
app.set('view engine','jade'); //视图模板
var a = require('connect-mongo');

var mongoStore = require('connect-mongo')(session);//session相关

app.use(cookieParser());

app.use(session({
  store: new mongoStore({
    url:dbUrl,
    collection:'sessions'
  }),
  resave:false,
  saveUninitialized:false,
  secret: 'keyboard cat'
}));
app.use(require('connect-multiparty')());
app.use(bodyParser.urlencoded({ extended: true })) //是否默认转换 是
app.use(express.static(path.join(__dirname,'public'))); //静态资源路径
app.locals.moment = require('moment')
app.listen(port);//监听端口
if('development' === app.get('env')){
	app.set('showStackError',true);
	app.use(logger(':method :url :status'));
	app.locals.pretty = true;
	//mongoose.set('debug',true);
}
require('./config/routes')(app);
console.log('imooc started on port '+port); //启动信息