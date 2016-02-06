'use strict';


require("./config/log4js.js").init();
const logg = require("./config/log4js.js").logg();
const logf = require("./config/log4js.js").file();
//const Q = require("q");
const path = require('path');
const co = require( 'co' );
const Koa = require('koa');
const app = new Koa();
const convert = require('koa-convert');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
//const koaStatic = require('./lib/koa-static.js');
//const render = require('koa-ejs2x');
//const render = require('koa-ejs');
//const nunjucks = require('koa-nunjucks-promise');//另一个render模块
const views = require('koa-views'); //支持 jade nunjucks
//const mongoose = require('mongoose');
//const autoIncrement = require('mongoose-auto-increment');
require('./app/schema/DbInit.js').init();
//const blogRouter = require('./app/routers/blog.router.js');
const routers = require('./app/routers/routers.js');
//app.use(koaStatic(__dirname + '/static'));
app.use(convert(koaStatic(__dirname + '/static')));
//app.use(co.wrap(koaStatic(__dirname + '/static')));
//参考: https://github.com/tj/co/pull/256#issuecomment-168475913
require('bluebird').config({ warnings: false,});//禁止koa-static库一个警告

// //可以用
// app.use(nunjucks('views', {
//   ext: 'html',
//   noCache: process.env.NODE_ENV === 'development',
//   filters: {
//     json: function(str) {
//       return JSON.stringify(str, null, 2);
//     }
//   },
//   globals: {
//     version: 'v8.0.1'
//   }
// }));
app.use(bodyParser());
app.use(convert(views('app/views', {
    map: {
        html: 'nunjucks'
    },
    // extension: {
    //     tags: {
    //         blockStart: '{{',
    //         blockEnd: '}}',
    //         variableStart: '{{',
    //         variableEnd: '}}',
    //         commentStart: '{#',
    //         commentEnd: '#}'
    //     }
    // }
})));

app.use(async (ctx, next) => {
  
  ctx.render = co.wrap(ctx.render);
  //ctx.render = convert(ctx.render);
  await next();
});
// render(app, {
//   root: path.join(__dirname, 'views'),
//   //layout: 'template',
//   viewExt: 'html',
//   cache: false,
//   debug: true
// });
// Object.defineProperty(app.context, 'render', {
//     get: function() {
//         return convert(
//             render(app, {
//             root: path.join(__dirname, 'views'),
//             //layout: 'template',
//             viewExt: 'html',
//             cache: false,
//             debug: true
//             })
//         );
//     },
// });

function testmg(format) {
  console.log('进入 testmg');
  return async function (ctx, next){
    console.log('testmg async {{');
    await next();
    console.log('testmg async }}');
    }
}
app.use(testmg());

// function * legacyMiddleware (next) {
//   console.log('legacyMiddleware {{');
//   yield next
// //   debugger;
// //   this.app.context.render('index', {a:1});
//   console.log('legacyMiddleware }}');
// }
//app.use(convert(legacyMiddleware))

app.use(routers.init());
//app.use(blogRouter.routes());
// // response
// app.use(ctx => {
//     console.log('body {{');
//     ctx.body += 'Hello Koa';
//     console.log('body }}');
// });

app.on('error', function (err, ctx) {
    logg.error('error:' + err);
  if (err == null) return

  if (!(err instanceof Error)) err = new Error(`non-error thrown: ${err}`)

  if (ctx) {
    // do some stuff here.
    let msg = {}; // whatever you want to respond with
    // finally, make sure you finish properly:
    msg = JSON.stringify(msg);
    ctx.res.statusCode = err.status;
    ctx.res.length = Buffer.byteLength(msg);
    ctx.res.end(msg);
  }
})

app.listen(3000);
logg.info('listen 3000');


