"use strict";
//var mgdb = require('../js/mgdb.js');
var mongoose = require('mongoose');
var Blog = mongoose.model('blog');;

function *index(next) {
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
function *articles_add(next) {
	try{
        var blog = new Blog({
            uid: 123,
            username: 'trigkit4',
            title:  'titleString',
            author: 'authorString',
            body:   'bodyString',
            reply:0,
            see:0,
        });

        blog.save(function (err) {
            if(err){
                this.res.end('Error');
                return next();
            }
        });
        this.body = 'nodjs新增文章:' + 888;
	}catch(e){
		console.log("错误:"+e.toString());
	}
}
function *articles_get(next) {
    var self = this;
    //var blogs = Blog.find({}, 'title username').skip((1-1)*5).limit(6);
    var blogs = Blog.find({}).skip((1-1)*5).limit(6);
    //blogs.sort({time:-1});
    var docs = yield blogs.exec();
	yield  self.render('index', {title:"极致代理3", list:docs});
    return;
	try{
		//yield this.render('index', {title:"极致代理3", list:data});
        this.body = '文章id:' + this.params.id;
	}catch(e){
		console.log("错误:"+e.toString());
	}
}
function *articles_put(next) {
	try{
        this.body = 'nodjs更新文章:' + this.params.id;
	}catch(e){
		console.log("错误:"+e.toString());
	}
}
function *articles_del(next) {
	try{
        var abc = yield Blog.remove({_id:this.params.id}).exec();
        this.body = 'nodejs删除文章:' + this.params.id;
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
    router.post('/articles', articles_add);
	router.get('/articles/:id', articles_get);
    router.put('/articles/:id', articles_put);
    router.delete('/articles/:id', articles_del);
    
	// router.get('/getProxy.html', getProxy);
    
}