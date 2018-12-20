var express=require('express');
var app=express();
var ejs=require('ejs');
const path=require('path');
var engine=require('ejs-mate');
var User=require('./models/user.js');
var Category=require('./models/category');
var router=express.Router();
var morgan=require('morgan');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var mainRoutes=require('./routes/main');
var userRoutes=require('./routes/user');
var adminRoutes=require('./routes/admin');
var apiRoutes=require('./routes/api')
var cookieParser=require('cookie-parser');
var flash=require('express-flash');
var session=require('express-session');
var passport=require('passport');
var MongoStore=require('connect-mongo')(session);
mongoose.connect('mongodb://root:a1b2h3daksh@ds127644.mlab.com:27644/ecommerce',err=>{
	if(err){console.log(err)}
	else{console.log('Connected to Database')}
})

app.use('/static',express.static('./public'))
app.use(bodyParser.json());
app.use(cookieParser('abhi'));
app.use(flash());

app.use(session({saveUninitialized:true,resave:true, secret:'abhi' 
,store:new MongoStore({url:'mongodb://root:a1b2h3daksh@ds127644.mlab.com:27644/ecommerce', autoReconnect:true})
}))
app.use(passport.initialize())
app.use(passport.session())// used to change user in req by true deserializing user object
app.use((req,res,next)=>{
	res.locals.user=req.user;
	next()
})
app.use((req,res,next)=>{
	Category.find({},(err,categories)=>{
		if(err){next(err)}
		res.locals.categories=categories;
		next();
	})
})
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(mainRoutes);
app.use(userRoutes);
app.use('/api',apiRoutes)
app.use('/admin',adminRoutes);
app.engine('ejs',engine);
app.set('view engine', 'ejs');



app.listen(port=3000,()=>{console.log('Server is listening on 3000')})