"use strict";


function *index(next) {
	try{
		yield this.render('index', {title:"极致代理"});
	}catch(e){
		console.log("错误:"+e.toString());
	}
}

module.exports = function (router) {	
	console.log("front.js");
	// router.get('/to', get);
	// router.post('/to', post);
	router.get('/', index);
	router.get('/index', index);
	// router.get('/getProxy.html', getProxy);
    
}