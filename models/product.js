var mongoose=require('mongoose');
var schema=mongoose.Schema;
var mongoosastic=require('mongoosastic');
var ProductSchema=new schema({
	category:{type:schema.Types.ObjectId, ref:'Category',es_type:'nested', es_include_in_parent:true},
	name:String,
	price:Number,
	image:String
})
ProductSchema.plugin(mongoosastic,{
	hosts:['localhost:9200'],
	populate:[{path:'category'}]
})
module.exports=mongoose.model('Product', ProductSchema,'Product')