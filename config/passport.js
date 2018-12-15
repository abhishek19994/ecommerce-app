var passport=require('passport');
var LocalStrategy= require('passport-local').Strategy;
var GoogleStrategy= require('passport-google-oauth20').Strategy;
var config=require('./config.js');
var User=require('../models/user.js');
passport.serializeUser(function(user, done) {

  done(null, user._id);

});
passport.deserializeUser(function(id, done) {
User.findById(id,(err,user)=>{
	done(err,user);
})


});

passport.use('local-login' , new LocalStrategy({
	 usernameField:'email',
	 passwordField:'password',
	passReqToCallback:true
},(req,email,password,done)=>{
	User.findOne({email:email},function(err, user){

		if(err) {return done(err)}
		if(!user){return done(null, false,req.flash('loginMessage','Email id is not found'));}
		if(!user.comparePassword(password)){return done(null,false,req.flash('loginMessage', 'password is wrong'))}
		return done(null, user);
	})

}))
exports.isAuthenticated=function(req,res,next){
	if(req.isAuthenticated()){return next();}
	res.redirect('/signIn');

}

passport.use(new GoogleStrategy({
	clientID:config.clientID,
	clientSecret:config.clientSecret,
	callbackURL:'http://localhost:3000/auth/google/callback'
},function(accessToken,refreshToken,profile,done ){
	User.findOne({googleId:profile.id},function(err,user){
if(err){return done(err)}
	
			if(user){

return done(null,user)}
	   		else{var user=new User();
	   			user.email=profile.emails[0].value;
	   			user.profile.name=profile.displayName;
	   			user.profile.picture=profile.photos[0].value;
	   			user.googleId=profile.id;
	   		user.save(function(err){
	   			if(err){return done(err)}
	   		})}

	   	})
console.log(profile);
}))
	 
	   
	  
