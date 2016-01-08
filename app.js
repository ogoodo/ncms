
"use strict";
var logg = require("./config/log4js.js").init();
var logf = require("./config/log4js.js").file();
// return;
// var log4js = require('log4js');
// log4js.configure(require("./config/log4js.json"));
let path = require('path');

let koa = require('koa');
var logger = require('koa-logger');
let Router = require('koa-router');
let bodyParser = require('koa-bodyparser');
//let render = require('koa-views');
let render = require('koa-ejs');
let staticServer = require('koa-static');
// let session = require('koa-generic-session');
// let sessionStore = require('koa-session-mongoose');

let config = require('./config/config');
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
	this.redirect('/404.html'); 
	//logg.debug('404}}');
}); 

app
	.use(logger())
	.use(staticServer(path.join(__dirname, '/public')))
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
  filters:filters,
});
	

app.listen(config.port);
//console.log(logg);
logg.info('服务器启动,端口:' + config.port);
logf.info('服务器启动,端口:' + config.port);

app.on('error', function(err, ctx){
	console.log(err);
  //log.error('server error', err);
});

