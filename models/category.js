var mongoose=require('mongoose');
var schema=mongoose.Schema;
var CategorySchema=new schema({
name:{type:String, unique:true,require:true}

})
module.exports=mongoose.model('Category',CategorySchema,'Category')