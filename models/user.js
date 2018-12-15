var mongoose=require('mongoose');
var bcrypt=require('bcrypt-nodejs');
var schema=mongoose.Schema;
var UserSchema=new schema({

email:{type:String, unique:true}, 
password:{type:String},
profile:{name:String,picture:{type:String,default:''}},
address:String,
history:[{date:Date,paid:{type:Number, default:0}}],
googleId:String

});
// middleware built in as pre and according to modifier save it is called every time new user is created and before saving into database
UserSchema.pre('save',function(next){
	var user=this;

	bcrypt.genSalt(10,(err, salt)=>{
		if(err)return next(err)
		bcrypt.hash(user.password, salt,null,(err,hash)=>{
			if(err)return next(err)
			user.password=hash;
			next()
			//return next();
		})
	})
})
// this is custom method
UserSchema.methods.comparePassword=function(password){
	return bcrypt.compareSync(password,this.password);
}

module.exports=mongoose.model('User', UserSchema, 'User')