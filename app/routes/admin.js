"use strict";



function *get(next) {
  this.body += "to.api.get";
}
function *post(next) {
  this.body += "to.api.post";
}


function *admin(next) {
    console.log('admin');
	try{
		yield this.render('admin', {title:"nodeIDE后台"});
	}catch(e){
		console.log("错误:"+e.toString());
	}
}
module.exports = function (router) {	
	console.log("admin.js");
	router.get('/', admin);
	router.post('/article', post);
}