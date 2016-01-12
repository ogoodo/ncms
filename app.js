
"use strict";
var logg = require("./config/log4js.js").init();
var logf = require("./config/log4js.js").file();
// return;
// var log4js = require('log4js');
// log4js.configure(require("./config/log4js.json"));
let path = require('path');
let config = require('./config/config');
let mongoose = require('./app/schema/mgdb.js');
let db = mongoose();
require('./app/schema/blog.js');
//require('../schema/blog.js');

let koa = require('koa');
var logger = require('koa-logger');
let Router = require('koa-router');
let bodyParser = require('koa-bodyparser');
//let render = require('koa-views');
//let render = require('koa-ejs');
let render = require('koa-ejs2x');
//let LRU = require('lru-cache');
//render.cache = LRU(100); // LRU cache with 100-item limit
let staticServer = require('koa-static');
// let session = require('koa-generic-session');
// let sessionStore = require('koa-session-mongoose');

let adminRoutes = require('./app/routes/admin/admin');
let frontRoutes = require('./app/routes/front');
let response = require('./app/middlewares/response');


// var logg = log4js.getLogger('app');
// logg.setLevel('DEBUG');
// var logf = log4js.getLogger('log_file');

let adminRouter = new Router({prefix: "/admin"});
let frontRouter = new Router();
let app = koa();
app.proxy = true;

//自定义404
app.use(function *(next){ 
	//logg.debug('404{{');
	yield next; 
	if (this.body || !this.idempotent){
		return;
	}
	//this.redirect('/404.html'); 
    this.body = '404页面不存在';
	//logg.debug('404}}');
}); 
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.response.lastModified = new Date();
  this.response.set('Ogoodo.com-Time2', ms + 'ms');
  this.set('Ogoodo.com-Time', ms + 'ms');
  this.response.append('Ogoodo.com-Time', ms + '2ms');
});
// logger
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static-cache')('/static', {maxAge: 60 * 60}));
app
	.use(logger())
	.use(staticServer(path.join(__dirname, '/static')))
	//.use(render(path.join(__dirname, "./app/views"), { default: 'ejs' }))
	.use(response())
	.use(bodyParser())
	.use(adminRouter.routes())
	.use(adminRouter.allowedMethods())
	.use(frontRouter.routes())
	.use(frontRouter.allowedMethods());
	
adminRoutes(adminRouter);
frontRoutes(frontRouter);

var filters = {
  format: function (time) {
    return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
  }
};

render(app, {
  root: path.join(__dirname, './app/views'),
  //layout: 'template',
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: true,
  //locals: global locals, can be function type, this in the function is koa's ctx.
  //filters:filters,
//   delimiter:"{{ }}",
//   open:'{{',
//   close:'}}',
});


app.listen(config.port);
//console.log(logg);
logg.info('服务器启动,端口:' + config.port);
logf.info('服务器启动,端口:' + config.port);

app.on('error', function(err, ctx){
	console.log(err);
  //log.error('server error', err);
});

