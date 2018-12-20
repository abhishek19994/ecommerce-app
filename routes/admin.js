var router=require('express').Router();
var Category=require('../models/category')

router.get('/addCategory', (req,res)=>{

	res.render('./admin/Category',{success:req.flash('success')})
})
router.post('/addCategory',(req,res,next)=>{
var category=new Category();
category.name=req.body.name;

category.save((err)=>{
if(err){return next(err)}
	req.flash('success','Successfully added a category')
return res.redirect('/addCategory')
})

})
module.exports=router