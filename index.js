var express=require('express');
var app=express();
var ejs=require('ejs');
const path=require('path');
var engine=require('ejs-mate');
var User=require('./models/user.js');
var router=express.Router();
var morgan=require('morgan');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var mainRoutes=require('./routes/main');
var userRoutes=require('./routes/user');

mongoose.connect('mongodb://root:a1b2h3daksh@ds127644.mlab.com:27644/ecommerce',err=>{
	if(err){console.log(err)}
	else{console.log('Connected to Database')}
})
app.use('/static',express.static('./public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(mainRoutes);
app.use(userRoutes);
app.engine('ejs',engine);
app.set('view engine', 'ejs');



app.listen(port=3000,()=>{console.log('Server is listening on 3000')})