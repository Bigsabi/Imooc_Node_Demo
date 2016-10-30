var User = require('../models/user') //对象

//用户列表
exports.list = function(req,res){
	User.fetch(function(err,users){
		if(err)
			console.log(err);
		else
			res.render('userlist',{
				title:'列表页',
				users:users
			});
	});
}


//用户列表
exports.showSignup = function(req,res){
	res.render('signup',{
		title:'注册页面'
	});
}

//注册
exports.signup = function(req,res){
	// console.log(req.body);
	var _user = req.body.user;
	// Express 参数优先级 路由>Post>Get :userid,{userid:userid},?userid=userid
	User.findOne({name:_user.name},function(err,user){
		if(err)
			console.log(err);
		if(user)
			return res.redirect('/');
		else{
			var user = new User(_user);
			user.save(function(err,user){
				if(err)
					console.log(err);
				else
					console.log(user);
				res.redirect('/');
			});
		}
	});
}

//用户列表
exports.showSignin = function(req,res){
	res.render('signin',{
		title:'登录页面'
	});
}

//登陆
exports.signin = function(req,res){
	// console.log(req.body);
	var _user = req.body.user;
	//Express 参数优先级 路由>Post>Get :userid,{userid:userid},?userid=userid
	User.findOne({name:_user.name},function(err,user){
		if(err)
			console.log(err);
		if(!user){
			return res.redirect('/signup');
		}
		else{
			user.comparePassword(_user.password,function(err,isMatch){
				if(err)
					console.log(err);
				if(isMatch){
					req.session.user = user;
					console.log('登陆成功!');
					return res.redirect('/');
				}else{
					console.log('登陆失败!');
					return res.redirect('/signin');
				}
			})
			//aa
		}
	});
}

//登出
exports.logout = function(req,res){
	delete req.session.user;
	// delete app.locals.user;
	return res.redirect('/')
}
//User中间件
exports.signinRequired = function(req,res,next){
	var user = req.session.user;
	if(!user){
		return res.redirect('/signin');
	}
	next();
}
//User中间件
exports.adminRequired = function(req,res,next){
	var user = req.session.user;
	if(user.role<=10){
		return res.redirect('/signin');
	}
	next();
}
exports.unloginRequired = function(req,res,next){
	var user = req.session.user;
	if(user){
		return res.redirect('/signin');
	}
	next();
}