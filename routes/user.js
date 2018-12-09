var router=require('express').Router();
var User=require('../models/user');
router.get('/signUp',(req,res,next)=>{
	res.render('./user/signUp');
})
router.post('/signUp',(req,res,next)=>{
	var user=new User();
	user.profile.name=req.body.name;
	user.email=req.body.email;
	user.password=req.body.password
	User.findOne({email:req.body.email}, (err, existingUser)=>{
		if(existingUser){console.log(existingUser.email+" is already exist");
		return res.redirect('/signUp');}
		else{
			user.save((err)=>{if(err){return next(err)}
return res.json('Successfully saved');

	})
		}
	})
	
})
module.exports=router;