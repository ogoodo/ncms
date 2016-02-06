"use strict";
//var mgdb = require('../js/mgdb.js');
var mongoose = require('mongoose');
var Blog = mongoose.model('blog');

function *index(next) {
    var blogs = Blog.find({}).skip((1-1)*5).limit(60);//.sort({time:-1});
    var docs = yield blogs.exec();
	yield  this.render('index', {title:"极致代理3", list:docs});
}
function *article_save(next) {
	try{
        var blog = new Blog({
            uid: 123,
            author: 'this.request.body.author',
            title: this.request.body.title,
            tags: this.request.body.tags,
            excerpt: this.request.body.excerpt,
            body:  this.request.body.body,
            reply:0,
            see:0,
        });
        var ret = yield blog.save();
        if(ret){
            this.redirect('/article/' + blog._id); 
        }
	}catch(e){
		console.log("错误:"+e.toString());
	}
}
function *article_update(next) {    
    var blog = {
        _id: this.request.body.id,
        author: 'this.request.body.author',
        title: this.request.body.title,
        tags: this.request.body.tags,
        excerpt: this.request.body.excerpt,
        body:  this.request.body.body,
        reply:0,
        see:0,
    };
    var ret = yield Blog.update({_id:this.request.body.id}, blog);
    if(ret.ok){
        this.redirect('/article/' + this.request.body.id); 
    }
}
function *article_show(next) {
    try {
        var blog = yield Blog.findById(this.params.id);
        yield  this.render('article/show', blog);
    } catch ( e ) {
        console . log ( e );
    }
}
function *article_add(next) {
    var blogs = new Blog();
    try {
        yield  this.render('article/add', blogs);
    } catch ( e ) {
        console . log ( e );
    }
}
function *article_edit(next) {
    var blogs = Blog.find({_id:this.params.id}).skip(0).limit(1);
    try {
        var docs = yield blogs.exec();
        yield  this.render('article/add', docs[0]);
    } catch ( e ) {
        console . log ( e );
    }
}
function *article_put(next) {
	try{
        this.body = 'nodjs更新文章:' + this.params.id;
	}catch(e){
		console.log("错误:"+e.toString());
	}
}
function *article_delete(next) {
	try{
        var blog = yield Blog.remove({_id:this.params.id}).exec();
        this.body = 'nodejs删除文章:' + blog.result.ok;
	}catch(e){
		console.log("错误:"+e.toString());
	}
}

module.exports = function (router) {	
	console.log("front.js");
	router.get('/', index);
	router.get('/index', index);
	router.get('/article/:id', article_show);
	router.get('/article/add', article_add);
	router.get('/article/edit/:id', article_edit);
    router.get('/article/delete/:id', article_delete);    
    router.post('/article/add', article_save);
    router.post('/article/edit', article_update);
    router.put('/article/edit/:id', article_put);
    router.delete('/article/:id', article_delete);        
}
