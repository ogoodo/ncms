"use strict";
//var mgdb = require('../js/mgdb.js');
var mongoose = require('mongoose');
var Blog = mongoose.model('blog');;

function *index(next) {
    var blogs = Blog.find({}).skip((1-1)*5).limit(60);//.sort({time:-1});
    var docs = yield blogs.exec();
	yield  this.render('index', {title:"极致代理3", list:docs});
    return;
   // mgdb.test();
    var data = [
      {title:'标题',author:'小强',date:'2015-12-12',reply:13,see:11,
      url:'/articles/12', id:'12',
      excerpt:'这是一篇关于网页设计的文章\r\n是一篇关于网页设计的、、人多、\是关于网页设计的一篇关于网页设计的文章\r\n是一篇关于网页设计的、、人多、\是关于网页设计的'
      },  
      {title:'标题',
      url:'/articles/13', id:'13',    
      excerpt:'这是一篇关于网页设计的文章',author:'小强',date:'2015-12-12',reply:13,see:11},  
    ];
	try{
		yield this.render('index', {title:"极致代理3", list:data});
	}catch(e){
		console.log("错误:"+e.toString());
	}
}
function *articles_save(next) {
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

        var ab = yield blog.save();
            //yield  this.render('article/show', ab);
            
            return;
        ab.then(function(blog) {
            console.log(blog);
            //this.body = 'then nodjs新增文章:' + 888;
            // do something with updated user
        }).catch(function(err){
            console.log('error:', err);
        });
        this.body = 'nodjs新增文章:' + 888;
	}catch(e){
		console.log("错误:"+e.toString());
	}
}
function *articles_update(next) {    
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
    var ab = yield Blog.update({_id:this.request.body.id}, blog);
    //yield  this.render('article/show', ab);
    if(ab.ok){
        this.redirect('/articles/' + this.request.body.id); 
    }
}

	// try{
    //     var blog = new Blog({
    //         _id: this.request.body.id,
    //         author: 'this.request.body.author',
    //         title: this.request.body.title,
    //         tags: this.request.body.tags,
    //         excerpt: this.request.body.excerpt,
    //         body:  this.request.body.body,
    //         reply:0,
    //         see:0,
    //     });

    //     var ab = yield blog.update();
    //     //var ab = yield blog.update({ _id: this.request.body.id }, blog);
    //     if(ab.result.ok){
    //         this.redirect('/article/' + this.request.body.id); 
    //     }
    //         //yield  this.render('article/show', ab);
    //         return;
    //     ab.then(function(blog) {
    //         console.log(blog);
    //         //this.body = 'then nodjs新增文章:' + 888;
    //         // do something with updated user
    //     }).catch(function(err){
    //         console.log('error:', err);
    //     });
    //     this.body = 'nodjs新增文章:' + 888;
	// }catch(e){
	// 	console.log("错误:"+e.toString());
	// }
function *articles_show(next) {
    try {
        // var blogs = Blog.find({_id:this.params.id}).skip(0).limit(1);
        // var docs = yield blogs.exec();
        // yield  this.render('article/show', docs[0]);
        var blog = yield Blog.findById(this.params.id);
        yield  this.render('article/show', blog);
    } catch ( e ) {
        console . log ( e );
    }
}
function *articles_add(next) {
    var blogs = new Blog();
    try {
        yield  this.render('article/add', blogs);
    } catch ( e ) {
        console . log ( e );
    }
}
function *articles_edit(next) {
    var blogs = Blog.find({_id:this.params.id}).skip(0).limit(1);
    try {
        var docs = yield blogs.exec();
        yield  this.render('article/add', docs[0]);
    } catch ( e ) {
        console . log ( e );
    }
}
// return;
// yield this.render('article', {title:"文章标题"});
// return;
// try{
// 	//yield this.render('index', {title:"极致代理3", list:data});
//     this.body = '文章id:' + this.params.id;
// }catch(e){
// 	console.log("错误:"+e.toString());
// }
function *articles_put(next) {
	try{
        this.body = 'nodjs更新文章:' + this.params.id;
	}catch(e){
		console.log("错误:"+e.toString());
	}
}
function *articles_delete(next) {
	try{
        var blog = yield Blog.remove({_id:this.params.id}).exec();
        this.body = 'nodejs删除文章:' + blog.result.ok;
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
	router.get('/articles/:id', articles_show);
	router.get('/articles/add', articles_add);
	router.get('/articles/edit/:id', articles_edit);
    router.get('/articles/delete/:id', articles_delete);    
    router.post('/articles/add', articles_save);
    router.post('/articles/edit', articles_update);
    router.put('/articles/edit/:id', articles_put);
    //router.delete('/articles/:id', articles_delete);
    
	// router.get('/getProxy.html', getProxy);
    
}