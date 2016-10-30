var Movie = require('../models/movie') //对象
var Category = require('../models/category') //对象

exports.index = function(req,res){
  Category
    .find({})
    .populate({
      path:'movies',
      select:'title poster',
      options:{limit:5}
    })
    .exec(function(err,categories){
			res.render('index',{
				title:'首页',
				categories: categories
			});
    });
}

exports.search = function(req,res){
  var catId = req.query.cat;
  var count = 2;
  var page = parseInt(req.query.p,10)||1;
  var q = req.query.q;
  var startLine = (page - 1) * count;

//      options:{limit:2,skip:startLine}
  if(catId){
    //console.log(1);
    Category
      .findOne({_id:catId})
      .populate({
        path:'movies',
        select:'title poster'
      })
      .exec(function(err,category){
        var movies = category.movies||[];
        var results = movies.slice(startLine,startLine+count);

        res.render('results',{
          title:'首页',
          keyword: category.name,
          currentPage:page,
          query:'cat='+catId,
          totalPage:Math.ceil(movies.length/count),
          movies:results
        });
      });
  }else{
    Movie
      .find({ title: new RegExp(q+'.*','i') })
      .exec(function(err,movies){
        if(err)
          console.log(err);
        console.log(movies);
        var results = movies.slice(startLine,startLine+count);

        res.render('results',{
          title:q,
          keyword: q,
          currentPage:page,
          query:'q='+q,
          totalPage:Math.ceil(movies.length/count),
          movies:results
        });
      });
  }
}