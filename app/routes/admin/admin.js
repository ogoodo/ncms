"use strict";
let manage = require('../../schema/manage.js');



function *get(next) {
  this.body += "to.api.get";
}
function *post(next) {
  this.body += "to.api.post";
}
function *admin_drop(next) {
    manage.dropDatabase();
  this.body += "to.api.dropDatabase";
}
function *admin_delete(next) {
    manage.dropCollections();
  this.body += "to.api.dropCollections";
}
function *admin_clear(next) {
 manage.clearDocs();
  this.body += "to.api.get";
}


function *admin(next) {
    console.log('admin');
	try{
		yield this.render('admin/admin', {title:"nodeIDE后台"});
	}catch(e){
		console.log("错误:"+e.toString());
	}
}
module.exports = function (router) {	
	console.log("admin.js");
	router.get('/', admin);
	router.get('/drop', admin_drop);
	router.get('/delete', admin_delete);
	router.get('/clear', admin_clear);
	router.post('/article', post);
}