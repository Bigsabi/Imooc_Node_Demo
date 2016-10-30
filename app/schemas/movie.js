var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var MovieSchema = new mongoose.Schema({
	doctor:String,		//作者
	title:String,		//电影名称
	language:String,	//语种
	country:String,		//国家
	summary:String,		//备注
	flash:String,		//地址
	poster:String,		//海报
	year:Number,		//年份
	pv: {
		type:Number,
		default:0
	},
	category: {
		type:ObjectId,
		ref:'Category'
	},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
});

MovieSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt =this.meta.updateAt=Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
});

MovieSchema.statics = {
	fetch:function(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb);
	},
	findById:function(id,cb){
		return this
			.findOne({_id:id})
			.exec(cb);
	},
	delete:function(id,cb){
		console.log(id+"Delete");
		return this
			.findOne({_id:id})
			.remove();
	}
}

module.exports = MovieSchema;