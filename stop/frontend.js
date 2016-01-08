"use strict";

//let Sequelize = require('sequelize');
//let db = require('../../db/db.js');
let proxy = require('../controllers/proxy.js');

// var User = require('../controllers/user');
// var Article = require('../controllers/article');
// var Tag = require('../controllers/tag');
// var About = require('../controllers/about');
// var Archive = require('../controllers/archive');



function *getEjs(next) {
	try{
		yield this.render('index', {title:"极致代理"});
	}catch(e){
		console.log("错误:"+e.toString());
	}
}
function *get(next) {
	var proxy = yield fnGet(3000, 3);
	this.body += JSON.stringify(proxy);
	this.body += "\r\n\r\n\r\n";
	var proxy = yield fnGet(3000, 2);
	this.body += JSON.stringify(proxy);
  this.body += " to.get";
}
function *post(next) {
  this.body = "to.post";
}
function *getProxy(next) {
	yield this.render('getProxy', {title:"极致代理"});
	console.log(this.request.querystring);
	return;
}
module.exports = function (router) {	
	console.log("frontend.js");
	router.get('/to', get);
	router.post('/to', post);
	router.get('/ejs', getEjs);
	router.get('/getProxy.html', getProxy);
	router.get('/getProxy', proxy.router);
	router.post('/getProxy', proxy.post);
	
	/*
	//首页，和文章列表页的内容相同
	router.get('/',Article.index);
	
	//获取文章列表
	router.get('/articles',Article.index);			
	
	//查询文章详情
	router.get('/article/:articleId',Article.show);
	
	//获取分类文章列表
	router.get('/tag/:tagId',Tag.show);
	
	//获取归档文章列表
	router.get('/archive/:archiveId',Archive.show);
	
	//关于我
	router.get('/about',About.show);
	
	*/
}