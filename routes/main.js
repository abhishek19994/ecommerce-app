var express=require('express');
var router=express.Router();
router.get('/home',(req,res)=>{res.render('main/home')})
router.get('/about',(req,res)=>{res.render('main/about')})
module.exports=router;