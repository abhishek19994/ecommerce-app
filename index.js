var express=require('express');
var app=express();
var ejs=require('ejs');
var engine=require('ejs-mate');
var User=require('./models/user.js');
var router=express.Router();
var morgan=require('morgan');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
mongoose.connect('mongodb://root:a1b2h3daksh@ds127644.mlab.com:27644/ecommerce',err=>{
	if(err){console.log(err)}
	else{console.log('Connected to Database')}
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));
app.engine('ejs',engine);
app.set('view engine', 'ejs');
router.post('/create-user',(req,res,next)=>{
	var user=new User();
	user.profile.name=req.body.name;
	user.email=req.body.email;
	user.password=req.body.password
	
	user.save((err)=>{if(err){return next(err)}
res.json('Successfully saved');

	})
})

router.get('/home',(req,res)=>{res.render('home')})
router.get('/about',(req,res)=>{res.render('about')})
app.use('/',router);
app.listen(port=3000,()=>{console.log('Server is listening on 3000')})