var router=require('express').Router();
var User=require('../models/user');
var passport=require('passport');
var passportConf=require('../config/passport.js');
router.get('/signUp',(req,res,next)=>{
	res.render('./user/signUp',{errors:req.flash('errors')});
})
router.get('/signIn',(req,res,next)=>{
	if(req.user){res.redirect('/')}
		res.render('./user/signIn',{errors:req.flash('loginMessage')});
})
router.post('/signIn',passport.authenticate('local-login', {failureRedirect:'/signIn',failureFlash:true,
successRedirect:'/profile'}),

	
	)

router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login',
  	'https://www.googleapis.com/auth/userinfo.email'] }));
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/signIn' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });

router.post('/signUp',(req,res,next)=>{
	var user=new User();
	user.profile.name=req.body.name;
	user.email=req.body.email;
	user.password=req.body.password
	user.profile.picture=user.gravatar()
	User.findOne({email:req.body.email}, (err, existingUser)=>{
		if(existingUser){req.flash('errors',existingUser.email+" is already exist");
		return res.redirect('/signUp');}
		else{

			user.save((err)=>{if(err){return next(err)}
				


	})
req.logIn(user, (err)=>{
	if(err){return next(err)}
	return res.redirect('/profile');
})
		}
	})
	

})
router.get('/profile',(req,res,next)=>{
	if(req.user){res.render('./user/profile',{user:req.user})}
		else{
			res.redirect('/signIn')}


	})
router.get('/logout',(req,res,next)=>{
	req.logout();
	return res.redirect('/')
	
})	
router.post('/edit',(req,res,next)=>{
User.findOne({_id:req.user._id},(err,user)=>{
if(err){return next(err)}
if(req.body.name){user.profile.name=req.body.name}
if(req.body.password){user.password=req.body.password}
if(req.body.address){user.address=req.body.address}
	req.flash('success','Successfuly edited')
user.save((err)=>{if(err){return next(err)}})
res.redirect('/edit')	
})	
})
router.get('/edit',(req,res)=>{
	res.render('./user/edit',{message:req.flash('success')})
})
module.exports=router;