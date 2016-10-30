var Category = require('../models/Category');
var _ = require('underscore');

//新增
exports.new = function(req,res){
  res.render('category_admin',{
    title:'分类录入页',
    category:{
      name:'',
    }
  });
}

//Admin Post 添加页面
exports.save = function(req,res){
  //var id = req.body.movie._id;
  var _category = req.body.category;
  var category = new Category(_category);

  category.save(function(err,category){
    if(err)
      console.log(err);
    else
      res.redirect('/admin/category/list');
  });
}

//列表
exports.list = function(req,res){
  Category.fetch(function(err,categories){
    if(err)
      console.log(err);
    else
      res.render('category_list',{
        title:'分类列表页',
        categories:categories
      });
  });
}