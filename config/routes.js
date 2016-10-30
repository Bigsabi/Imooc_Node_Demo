var Index = require('../app/controllers/index');
var User = require('../app/controllers/User');
var Movie = require('../app/controllers/Movie');
var Comment = require('../app/controllers/Comment');
var Category = require('../app/controllers/Category');

//var bodyParser = require('body-parser'); //转换form实体的
//var _ = require('underscore'); //不知道
module.exports = function(app){
	//per handel user
	app.use(function(req,res,next){
		var _user = req.session.user;
		app.locals.user = _user;
		next();
	});
	/*
	var user = req.session.user;
	if(!user)
		return res.redirect('/signin');
	if(user.role>10){
	}
	*/
	/* 主页 */
	app.get('/',Index.index);
	/* 用户 */
	app.post('/user/signup',User.unloginRequired,User.signup);
	app.post('/user/signin',User.unloginRequired,User.signin);
	app.get('/logout',User.signinRequired,User.logout);
	app.get('/signin',User.unloginRequired,User.showSignin);
	app.get('/signup',User.unloginRequired,User.showSignup);
	app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.list);
	/* 电影 */
	app.get('/movie/:id',Movie.detail);
	app.post('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.savePoster,Movie.save);
	app.get('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.new);
	app.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired,Movie.update);
	app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list);
	app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del);
	/*评论*/
	app.post('/user/comment',User.signinRequired,Comment.save);
	/*分类*/
	app.get('/admin/category/new',User.signinRequired,User.adminRequired,Category.new);
	app.post('/admin/category/save',User.signinRequired,User.adminRequired,Category.save);
	app.get('/admin/category/list',User.signinRequired,User.adminRequired,Category.list);
	/*分页*/
	app.get("/results",Index.search);
}