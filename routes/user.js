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
router.get('/logout',(req,res)=>{
	req.logout();
	res.redirect('/')
	next()
})	

module.exports=router;