var express=require('express');
var router=express.Router();
var Product=require('../models/product')
var paginate=(req,res,next)=>{
	var perPage=9;
		var page=req.params.page;
		Product
		.find()
		.skip(perPage*page)
		.limit(perPage)
		.populate('category')
		.exec((err,products)=>{
			Product.count((err,count)=>{
				if(err){return next(err)}
				return res.render('main/products',{products:products, pages:count/perPage})
			})
		})
}
Product.createMapping((err,mapping)=>{
	if(err){
		console.log('Error in mapping');
		console.log(err);
	}
	else{
		console.log('Successfully mapped');
		console.log(mapping);
	}
})
var stream=Product.synchronize();
var count=0;
stream.on('data',()=>{
	count++;
})
stream.on('close',()=>{console.log('Indexed ' +count+" documents");})
stream.on('error',(err)=>{console.log(err)})
router.get('/',(req,res,next)=>{
	if(req.user){
		
paginate(req,res,next);


	}
	else{res.render('main/home')}

	})
router.get('/page/:page',(req,res,next)=>{
	if(req.user){paginate(req,res,next);}

})
router.get('/about',(req,res)=>{res.render('main/about')})
router.get('/products/:id',(req,res,next)=>{
	Product
	.find({category:req.params.id})
	.populate('category')
	.exec((err,products)=>{
		if(err){return next(err)}
			
		return res.render('../views/admin/products', {products:products})
	})

})
router.get('/product/:id',(req,res,next)=>{
	Product.findById(req.params.id)
	.populate('category')
	.exec((err,product)=>{
		if(err){return next(err)}
			console.log(product)

			return res.render('../views/admin/product', {product:product})
	})
		
		
		
	})
router.post('/search',(req,res,next)=>{res.redirect('/search?q='+req.body.q)})
router.get('/search',(req,res,next)=>{if(req.query.q){
	Product.search({
		query_string:{query:req.query.q}
	},(err,results)=>{
		if(err){return next(err)}
		var data=results.hits.hits.map((hit)=>{return hit})
	 console.log(data)

		return res.render('../views/main/search-result',{data:data, query:req.query.q})
	})
}})
module.exports=router;