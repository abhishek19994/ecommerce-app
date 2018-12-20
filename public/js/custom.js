$(function(){
$('#search').keyup(function(){
var search_term=$(this).val();
$.ajax({method:'POST',
	url:'/api/search',
data:{
	search_term
},
dataType:'json',
success:function(json){
var data=json.hits.hits.map((hit)=>{
	return hit
})

$('#searchResult').empty()
var html="";
for(var i=0;i<data.length;i++){
html+='<div class="col-md-4">';
html+='<a href="/product/"'+data[i]._source._id +'">';
html+='<div class="thumbnail">';
html+='<img src="'+ data[i]._source.image +'" height="300px" width="300px" >';
html+='<div class ="caption" style = "font-family:georgia,garamond,serif;color:Black;">';
html+='<h3><strong> '+ data[i]._source.name+'</strong></h3>';
html+='<p>'+data[i]._source.category.name+'</p>';
html+='<p>'+ data[i]._source.price +'</p>';
html+='</div></div></a></div>';
$('#searchResult').append(html)
}

console.log(data)
},
error:function(err){
console.log(err);
}
})

})


})