
"use strict";
let path = require('path');

let koa = require('koa');
var logger = require('koa-logger');
var log4js = require('log4js');
let Router = require('koa-router');
let bodyParser = require('koa-bodyparser');
//let render = require('koa-views');
let render = require('koa-ejs');
let staticServer = require('koa-static');
let session = require('koa-generic-session');
let sessionStore = require('koa-session-mongoose');

let config = require('./config/config');
let backendRoutes = require('./app/routes/backend');
let frontendRoutes = require('./app/routes/frontend');
let response = require('./app/middlewares/response');

log4js.configure({
  appenders: [
    { type: 'console' },{
      type: 'file', 
      filename: 'logs/access.log', 
      maxLogSize: 1024,
      backups:4,
      category: 'normal' 
    }
  ],
  replaceConsole: true
});
var logg = log4js.getLogger('app');
logg.setLevel('DEBUG');

let backendRouter = new Router({prefix: "/api"});
let frontendRouter = new Router();
let app = koa();
app.proxy = true;

//自定义404
app.use(function *(next){ 
	logg.debug('404{{');
	yield next; 
	if (this.body || !this.idempotent) return; 
	this.redirect('/404.html'); 
}); 

app
	.use(logger())
	.use(staticServer(path.join(__dirname, '/public')))
	//.use(render(path.join(__dirname, "./app/views"), { default: 'ejs' }))
	.use(response())
	.use(bodyParser())
	.use(backendRouter.routes())
	.use(backendRouter.allowedMethods())
	.use(frontendRouter.routes())
	.use(frontendRouter.allowedMethods());
	
backendRoutes(backendRouter);
frontendRoutes(frontendRouter);

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
	

app.listen(888);
//console.log(logg);
logg.info('服务器启动,端口:' + 888);

app.on('error', function(err, ctx){
	console.log(err);
  //log.error('server error', err);
});

